import Product from './product';
import {View} from 'react-native';

const MyComponent = () => {
  const product = {
    image_url: 'https://picsum.photos/200',
    product_name: 'Product Name',
    short_description: 'هذا هو الوصف المختصر',
  };

  return (
    <View>
      <Product {...product} />
    </View>
  );
};

export default MyComponent;
