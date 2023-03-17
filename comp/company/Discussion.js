import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import SlackPane from './slackPane';
import {useRoute} from '@react-navigation/native';

const Discussion = ({type}) => {
  const [facebookText, setFacebookText] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [showFacebook, setShowFacebook] = useState(false);
  const route = useRoute();
  const {product} = route.params;
  useEffect(() => {
    const projectId = product.name;
    const fetchFacebookGroup = async () => {
      try {
        const response = await fetch(
          `https://inprove-sport.info/jizdan/product/getFacebookGroup?projectId=${projectId}`,
        );
        const data = await response.json();
        if (data.res === 'ok') {
          setFacebookText(data.text);
          setFacebookLink(data.link);
          setShowFacebook(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFacebookGroup();
  }, []);

  const openUrl = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const openFacebookGroup = () => {
    openUrl(facebookLink);
  };

  return (
    <View style={styles.container}>
      {showFacebook && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{facebookText}</Text>
          <TouchableOpacity
            style={styles.facebookButton}
            onPress={openFacebookGroup}
            disabled={facebookLink === ''}>
            <Text style={styles.buttonText}>فتح مجموعة فيسبوك</Text>
          </TouchableOpacity>
        </View>
      )}
      <SlackPane type={'project'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Discussion;
