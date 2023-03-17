import React, {useEffect, useState} from 'react';
import MyWebview from '../util/myWebView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';
import {styles} from './productBoard';
import {Card} from 'react-native-paper';

const BudgetPlan = () => {
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phone = await AsyncStorage.getItem('@phone');
        const code = await AsyncStorage.getItem('@personalCode');
        const response = await fetch(
          'https://inprove-sport.info/jizdan/product/getStockPlanPage',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({phone, code}),
          },
        );
        const data = await response.json();
        if (data.showWebview) {
          setShowWebView(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {!showWebView && (
        <Card style={styles.content}>
          <View style={styles.Boardrow}>
            <Text style={styles.label}>
              سيتم الاعلان عن تفاصيل شراء الاسهم في هذه الصفحة
            </Text>
          </View>
        </Card>
      )}

      {showWebView && (
        <MyWebview url="https://inprove-sport.info/jizdan/product/getStockPlanPage" />
      )}
    </View>
  );
};

export default BudgetPlan;
