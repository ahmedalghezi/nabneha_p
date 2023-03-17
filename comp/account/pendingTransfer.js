import React, {useState} from 'react';
import {View, Text, Button, Alert, Linking, Share} from 'react-native';
import axios, {post} from 'axios';
import QRCode from 'react-native-qrcode-svg';
import Post from '../../DB/post';

//import Share from 'react-native-share';
import * as Sharing from 'expo-sharing';

//const path = `${RNFS.PicturesDirectoryPath}/image.png`;

const MakePendingTransaction = props => {
  const [code, setCode] = useState(null);
  //const [code, setCode] = useState(null);
  let svg = '';
  const shareQR = () => {
    const p1 = 'كود تحويل بمبلغ';
    const p2 = props.amount;
    const p3 = ' دينار ';
    const msg = p1 + p2 + p3;
    svg.toDataURL(async data => {
      const uri = `data:image/png;base64,${data}`;
      const shareImageBase64 = {
        title: 'QR',
        message: msg,
        url: uri,
      };
      Sharing.shareAsync(path);
      //Share.open(shareImageBase64);
    });
  };

  const shareQRCode = async () => {
    const shareOptions = {
      title: 'Share QR code',
      urls: ['data:image/png;base64,${data}'],
      social: Share.Social.WHATSAPP,
      saveToFiles: true,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransfer = async () => {
    Alert.alert(
      'Confirm Transfer',
      'Are you sure you want to transfer ' + props.amount + '?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              Post.post('/jizdan/createPendingTransaction', {
                amount: props.amount,
              }).then(response => {
                setCode(response.data.code);
                Alert.alert(response.data.msg);
              });
              //const response = await axios.post("https://inprove-sport.info/jizdan/createPendingTransaction", { amount: props.amount });
              //setCode(response.data.code);
            } catch (error) {
              console.error(error);
              Alert.alert(
                'Error',
                'An error occurred while making the transfer',
              );
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      {code ? (
        <View>
          {
            <QRCode
              value={code}
              size={200}
              color="#000000"
              backgroundColor="#ffffff"
              getRef={ref => (svg = ref)}
            />
          }
        </View>
      ) : (
        <Button title="Transfer" onPress={handleTransfer} />
      )}

      <Button title="share" onPress={shareQR} />
    </View>
  );
};

export default MakePendingTransaction;
