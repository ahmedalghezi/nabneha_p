import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://inprove-sport.info/jizdan/product/profile';

const ShowProfile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');

  useEffect(() => {
    // Make POST request to fetch profile data
    getProfileData();
  }, []);

  async function getProfileData() {
    const code = await AsyncStorage.getItem('@code_p');
    if (!code) {
      return;
    }
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code_p: code}), // Replace with your code
    })
      .then(response => response.json())
      .then(data => {
        setName(data.data.name);
        setAddress(data.data.address);
        setMobilePhone(data.data.phone);
      })
      .catch(error => console.error(error));
  }

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <Text style={styles.value}>{name}</Text>
        <Text style={styles.label}>الاسم:</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.value}>{address}</Text>
        <Text style={styles.label}>العنوان:</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.value}>{mobilePhone}</Text>
        <Text style={styles.label}>رقم الهاتف:</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    minHeight: 30,
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  value: {
    flex: 2,
    textAlign: 'right',
    fontSize: 16,
  },
});

export default ShowProfile;
