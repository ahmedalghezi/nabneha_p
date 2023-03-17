import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from './productsList';
import AllProductDetails from './allProductDetails';

const Stack = createStackNavigator();

const ProductListAll = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="قائمة المشاريع" component={ProductList} />
      <Stack.Screen name="كل التفاصيل" component={AllProductDetails} />
    </Stack.Navigator>
  );
};

export default ProductListAll;
