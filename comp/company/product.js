import React from 'react';
import {View, Image, Text} from 'react-native';
import {Card} from 'react-native-paper';

const Product = props => {
  if (!props.small) {
    return (
      <Card style={{margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 100, width: 100, margin: 10}}
            source={{uri: props.image_url}}
          />
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}>
              {props.product_name}
            </Text>
            <Text style={{fontSize: 14, textAlign: 'right', margin: 4}}>
              {props.short_description}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card style={{margin: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 50, width: 50, margin: 10}}
          source={{uri: props.image_url}}
        />
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}>
            {props.product_name}
          </Text>
          <Text style={{fontSize: 14, textAlign: 'right', margin: 4}}>
            {props.short_description}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default Product;
