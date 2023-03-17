import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowProfile from './ProfileCard';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [memberIdentity, setMemberIdentity] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from API using stored phone and code
  useEffect(() => {
    const fetchData = async () => {
      try {
        const phone = await AsyncStorage.getItem('@phone_p');
        const code = await AsyncStorage.getItem('@code_p');
        const response = await fetch(
          'https://inprove-sport.info/jizdan/product/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({phone, code}),
          },
        );
        const data = await response.json();
        if (data.res === 'ok') {
          setName(data.name);
          setMemberIdentity(data.identity_number);
        }
        if (data.res === 'no') {
          alert('عذراً انت غير مسجل');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Show loading indicator while data is being fetched
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>{'جاري الاتصال...'}</Text>
      </View>
    );
  }

  // Show profile information once data has been fetched
  return (
    <View style={styles.containerMain}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('./../../assets/icon_company.png')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {' مرحبا '} {name}
          </Text>
          <Text style={styles.memberIdentity}>
            {'  رمز العضوية ' + memberIdentity}
          </Text>
        </View>
      </View>
      <ShowProfile style={styles.item} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  item: {
    flex: 1,
    marginVertical: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f0f0',
    flexDirection: 'row',
    padding: 10,
    maxHeight: 150,
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  memberIdentity: {
    fontSize: 16,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});

export default ProfilePage;
