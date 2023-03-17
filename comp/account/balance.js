import Post from '../../DB/post';
import {Button, StyleSheet, View, Text} from 'react-native';
import {Card} from 'react-native-paper';

import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Balance(props) {
  const [balance, setBalance] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [debt, setDebt] = useState(0);
  const [shortCode, setShortCode] = useState(0);
  const [longCode, setLongCode] = useState(0);

  const [transferCount, setTransferCount] = useState(0);

  useEffect(() => {
    if (
      !initialized ||
      (props.transferCount && props.transferCount !== transferCount)
    ) {
      getBalance();
    }
    setTransferCount(props.transferCount);
    setInitialized(true);
  }, [initialized, props.transferCount, transferCount, getBalance]);

  async function cacheBalanceResult(res) {
    const str = JSON.stringify(res);
    try {
      await AsyncStorage.setItem('@balanceRes44', str);
    } catch (e) {
      // saving error
    }
  }

  const getCacheBalanceResult = async () => {
    try {
      const value = await AsyncStorage.getItem('@balanceRes44');
      return JSON.parse(value);
    } catch (e) {
      // error reading value
      return null;
    }
  };

  function setBalanceRes(res) {
    setBalance(res.balance);
    setDebt(res.debt);
    setShortCode(res.receiverCode);
    setLongCode(res.giveCode);
    if (props.onUpdateShortCode) {
      props.onUpdateShortCode(res.receiverCode);
    }
    if (props.onUpdateLongCode) {
      props.onUpdateLongCode(res.giveCode);
    }
  }

  async function getBalance() {
    const r = await getCacheBalanceResult();
    if (r) {
      setBalanceRes(r);
    }

    Post.getCurrentBalance({})
      .then(async response => {
        if (response.data.res === 'error') {
          alert('error code Bl20');
          return;
        }
        if (response.data.res === 'no') {
          alert('يرجى التسجيل اولاً');
          return;
        }
        if (response.data.res === 'ok') {
          await cacheBalanceResult(response.data);
          setBalanceRes(response.data);

          //TODO fix the type of the code
          /*
                setBalance(response.data.balance);
                setDebt(response.data.debt);
                setShortCode(response.data.receiverCode);
                setLongCode(response.data.giveCode);
                if (props.onUpdateShortCode) {
                    props.onUpdateShortCode(response.data.receiverCode);
                }
                if (props.onUpdateLongCode) {
                    props.onUpdateLongCode(response.data.giveCode);
                }*/
        }
      })
      .catch(e => {
        console.log(e);
        alert('Some error has happened, code Bla48');
      });
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={[{textAlign: 'right'}, {marginRight: 10}]}>
          {' حسابك الان: ' + balance}{' '}
        </Text>
      </Card>
      <Card style={styles.card}>
        <Text style={[{textAlign: 'right'}, {marginRight: 10}]}>
          {'الديون: ' + debt}
        </Text>
      </Card>
    </View>
  );
}

function getBalance() {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#ecf0f1',
    padding: 8,
    width: '100%',
    maxHeight: 150,
  },
  card: {
    padding: 12,
  },
});

export {getBalance};
