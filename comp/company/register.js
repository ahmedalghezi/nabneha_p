import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Register} from '../reg/register';
import ProfilePage from './profile';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

async function isProductRegistered() {
  // await AsyncStorage.removeItem('@code_p');
  const code = await AsyncStorage.getItem('@code_p', code);
  return code && code.length > 0;
}

const getMyCode = async () => {
  const code = await AsyncStorage.getItem('@code_p');
  return code;
};

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showConfirmNumber, setShowConfirmNumber] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkIfHeRegistered();
  }, []);

  async function checkIfHeRegistered() {
    const isR = await isProductRegistered();
    if (isR) {
      registerationDone();
    }
  }

  function registerationDone() {
    navigation.navigate('ملفي', {});
  }

  const handleSubmit = () => {
    // Check if all fields are non-empty and mobile number is valid
    if (name.trim() === '' || address.trim() === '' || phone.trim() === '') {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }
    const phoneL = '+964' + phone;
    const phoneRegex = /^\+964\d{10}$/;
    if (!phoneRegex.test(phoneL)) {
      Alert.alert('خطأ', 'يرجى إدخال رقم موبايل صالح');
      return;
    }

    // Send the form data to the server
    fetch('https://inprove-sport.info/jizdan/registerProductUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone: phoneL,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.res === 'exists') {
          alert('رقم الهاتف موجود مسبقا يرجى تسجيل الدخول');
          setShowConfirmNumber(true);
          return;
        }
        if (data.res === 'ok') {
          storeRegParam(phoneL, data.code);
        }
        // Handle success or error response from server
      })
      .catch(error => {
        console.error(error);
        // Handle network error
      });
  };

  const storeRegParam = async (phone, code) => {
    await AsyncStorage.setItem('@phone_p', phone);
    await AsyncStorage.setItem('@code_p', code);
    //alert(phone+","+code);
    registerationDone();
  };

  const onConfirmNumber = async obj => {
    if (!obj.phone.startsWith('+964') && !obj.phone.startsWith('00964')) {
      obj.phone = '+964' + obj.phone;
    }
    await storeRegParam(obj.phone, obj.code);
    registerationDone();
  };

  return (
    <View style={{minHeight: 600}}>
      {showConfirmNumber && (
        <Register onRegister={onConfirmNumber} phoneProduct={phone} />
      )}

      {!showConfirmNumber && (
        <View style={styles.container}>
          <Text style={styles.label}>الاسم الكامل</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="أدخل الاسم الكامل"
          />

          <Text style={styles.label}>الموبايل</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.prefix}>+964</Text>
            <TextInput
              style={styles.phoneInput}
              onChangeText={setPhone}
              value={phone}
              placeholder="أدخل رقم الموبايل"
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>العنوان</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="يرجى ادخال المحافظة والمنطقة"
          />

          <Button title="تسجيل" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const RegistrationOrProfile = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="تسجيل" component={RegistrationForm} />
      <Stack.Screen name="ملفي" component={ProfilePage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlign: 'right',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  prefix: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlign: 'right',
  },
});

export {RegistrationForm, isProductRegistered, getMyCode};
export default RegistrationOrProfile;
