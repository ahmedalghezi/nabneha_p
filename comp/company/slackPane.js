import React, {useEffect, useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';
import {styles} from './productBoard';
import {getMyCode} from './register';

const SlackPane = ({param}) => {
  const [email, setEmail] = useState('loading ...');
  const [password, setPassword] = useState('loading ...');
  const [noPassword, setNoPassword] = useState(false);
  const [link, setLink] = useState();
  const [regLink, setRegLink] = useState();
  const [working, setWorking] = useState(false);

  const handleSlackButtonPress = () => {
    try {
      if (link && !noPassword) {
        Linking.openURL(link);
      } else if (regLink && noPassword) {
        Linking.openURL(regLink);
      }
    } catch (e) {}
  };

  function setNotRegistered() {
    setEmail('(يرجى التسجيل أولاً)');
    setPassword('(يرجى التسجيل أولاً)');
  }

  async function getSlackInfo() {
    const myCode = await getMyCode();
    if (!myCode) {
      setNotRegistered();
      return;
    }
    if (!param) {
      param = {};
    }
    fetch('https://inprove-sport.info/jizdan/getSlack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({param: param, code: myCode}),
    })
      .then(response => response.json())
      .then(data => setSlackData(data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getSlackInfo();
  }, []);

  function setSlackData(data) {
    if (data.res === 'ok') {
      setEmail(data.email);
      setLink(data.link);
      setRegLink(data.regLink);
      if (data.password && data.password != '') {
        setPassword(data.password);
      } else {
        setNoPassword(true);
      }
    }
  }

  function handleSlackRefresh() {
    setWorking(true);

    fetch('https://inprove-sport.info/jizdan/getSlack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({param: param}),
    })
      .then(response => response.json())
      .then(data => setIncomingPassword(data))
      .catch(error => console.log(error));
  }

  function setIncomingPassword(data) {
    if (data.res === 'ok') {
      setPassword(data.password);
      setNoPassword(false);
    }

    setWorking(false);
  }

  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <Text style={{textAlign: 'right'}}>
          للدخول الى مساحة العمل الخاصة، يمكنك استعمال اسم المستخدم التالي:
        </Text>
        <View style={styles.row}>
          <Text style={styles.value}>{email}</Text>
          <Text style={styles.label}>اسم المستخدم:</Text>
        </View>

        {noPassword && (
          <Text
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: 'red',
              marginVertical: 10,
            }}>
            عند الضغط على الرابط ادناه، ادخل الايميل اعلاه، سيتم ارسال كلمة
            المرور لك هنا خلال دقائق
          </Text>
        )}

        <View style={styles.row}>
          {noPassword && (
            <TouchableOpacity onPress={handleSlackRefresh} disabled={working}>
              {!working && (
                <Image
                  source={require('../../assets/refresh.png')}
                  style={styles.buttonIcon}
                />
              )}
              {working && (
                <Image
                  source={require('../../assets/loading_gif.gif')}
                  style={styles.buttonIcon}
                />
              )}
            </TouchableOpacity>
          )}
          <Text style={styles.value}>{password}</Text>
          <Text style={styles.label}>كلمة مرور:</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSlackButtonPress}>
          <Image
            source={require('../../assets/slack.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Discuss on Slack</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default SlackPane;
