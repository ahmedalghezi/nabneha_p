import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import product from './product';
import {useRoute} from '@react-navigation/native';
import SlackPane from './slackPane';

const CompanyBoard = ({props}) => {
  const route = useRoute();
  const {product} = route.params;

  const [numStocks, setNumStocks] = useState('');
  const [numMembers, setNumMembers] = useState('');

  useEffect(() => {
    if (!product || numStocks || numMembers) {
      return;
    }
    if (product.totalShare && product.totalShare.availableCount > 0) {
      setNumStocks(product.totalShare.availableCount);
    }
    if (
      product.totalShare &&
      product.totalShare.count &&
      product.totalShare.count != 0
    ) {
      setNumMembers(product.totalShare.count);
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.value}>{numStocks}</Text>
            <Text style={styles.label}>عدد الاسهم:</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{numMembers}</Text>
            <Text style={styles.label}>عدد الاعضاء:</Text>
          </View>

          <View style={styles.Boardrow}>
            <Text style={styles.label}>
              يناقش مجلس الشركة جميع مفاصلها الادارية من خلال Slack
            </Text>
          </View>

          <SlackPane param={{}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    padding: 5,
  },

  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {},

  Boardrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#0077cc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompanyBoard;
export {styles};
