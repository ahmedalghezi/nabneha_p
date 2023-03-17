import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native';
import ProductDetails from './productDetail';
import CompanyBoard from './productBoard';
import ProductListAll from './ProductNavi';
import Product from './product';
import React from 'react';
import BudgetPlan from './BudgetPlan';
import Stock from './Stock';
import Discussion from './Discussion';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function AllProductDetails() {
  const route = useRoute();
  const {product} = route.params;

  return (
    <View style={{flex: 1}}>
      <Product
        image_url={product.image_url}
        product_name={product.product_name}
        short_description={product.short_description}
        small={true}
      />

      <TopTab.Navigator>
        <TopTab.Screen
          name="تفاصيل"
          component={ProductDetails}
          initialParams={{product}}
        />
        <Tab.Screen
          name="مجلس الادارة"
          component={CompanyBoard}
          initialParams={{product}}
        />
        <Tab.Screen
          name="ميزانية"
          component={BudgetPlan}
          initialParams={{product}}
        />
        <Tab.Screen name="الاسهم" component={Stock} initialParams={{product}} />
        <Tab.Screen
          name="ناقش"
          component={Discussion}
          initialParams={{product}}
        />
      </TopTab.Navigator>
    </View>
  );
}

export default AllProductDetails;
