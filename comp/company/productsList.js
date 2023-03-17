import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Product from './product';
import {useNavigation} from '@react-navigation/native';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [started, setStarted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (started) {
      return;
    }
    setStarted(true);
    setProductList(products);

    fetch('https://inprove-sport.info/jizdan/products')
      .then(res => res.json())
      .then(productList => processRawList(productList))
      .catch(error => console.error(error));
  }, []);

  const processRawList = productRawListObj => {
    let productRawList = productRawListObj.res;
    let products = [];
    for (let i = 0; i < productRawList.length; i++) {
      if (!productRawList[i]) {
        continue;
      }
      let obj = productRawList[i];
      for (let key in obj) {
        let value = obj[key];
        if (!value.proposed) {
          continue;
        }
        let productP = value.proposed;
        let name = value.name;
        let ID = '';
        /* if(value.ID)
                    ID = value.ID;
                else*/
        ID = Math.random();
        let viewOrder = value.viewOrder;
        let fullDescription = productP.fullDescription;
        let shortDescription = productP.shortDescription;
        let image_url = value.iconUrl;
        let videoThumb = productP.videoThumbUrl;
        let videoUrl = productP.videoUrl;
        let totalShare;
        if (productP.totalShare) {
          totalShare = productP.totalShare;
        }

        let product = {
          viewOrder: viewOrder,
          ID: ID,
          videoThumb: videoThumb,
          videoUrl: videoUrl,
          image_url: image_url,
          product_name: name,
          fullDescription: fullDescription,
          short_description: shortDescription,
          totalShare: totalShare,
        };
        if (viewOrder != -1) {
          products.push(product);
        }
      }
    }
    //products.sort((a, b) => a.viewOrder - b.viewOrder);

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (products[i].viewOrder > products[j].viewOrder) {
          let t = products[i];
          products[i] = products[j];
          products[j] = t;
        }
      }
    }
    setProductList(products);
  };

  const products = [];

  const handleItemPress = product => {
    console.log(`Selected item: ${product.product_name}`);
    //navigation.navigate('ProductDetails', { product });
    navigation.navigate('كل التفاصيل', {product});
  };

  return (
    <ScrollView>
      <View>
        {productList.map((product, index) => (
          <TouchableOpacity
            onPress={() => handleItemPress(product)}
            key={product.ID}>
            <Product
              image_url={product.image_url}
              product_name={product.product_name}
              short_description={product.short_description}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductList;
