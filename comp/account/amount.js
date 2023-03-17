import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';
import TextInput from '../util/textInput';
import {Button} from '@rneui/themed';
import {useEffect, useState} from 'react';

export default function Amount(props) {
  const [selectedBtn, setSelectedBtn] = useState();
  const [amount, setAmount] = useState(0);

  function handleBtn(value) {
    setAmount(amount + value);
    if (props.onAmountUpdated) {
      props.onAmountUpdated(amount + value);
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.amountPanel}>
        <Text
          style={[
            {textAlign: 'right'},
            {marginRight: 10},
            {fontSize: 18},
            {fontWeight: 'bold'},
          ]}>
          {'المبلغ المطلوب' + ': ' + amount}
        </Text>
        {selectedBtn === 'code' && (
          <View>
            <TextInput
              styel={styles.field}
              onChangeText={handleBtn}
              placeholder="رمز الاستلام"
              label="ادخل رمز الاستلام"
            />
          </View>
        )}
      </Card>

      <Card>
        <View style={styles.panel}>
          <Image
            resizeMode="contain"
            style={styles.stretch}
            source={require('../../assets/1000iq.jpeg')}
          />
          <Button
            style={{alignSelf: 'start'}}
            title={'+'}
            onPress={() => handleBtn(1000)}
          />
          <Button title={'-'} onPress={() => handleBtn(-1000)} />
        </View>
      </Card>

      <Card>
        <View style={styles.panel}>
          <Image
            resizeMode="contain"
            style={styles.stretch}
            source={require('../../assets/250_iq.jpeg')}
          />
          <Button
            style={{alignSelf: 'start'}}
            title={'+'}
            onPress={() => handleBtn(250)}
          />
          <Button title={'-'} onPress={() => handleBtn(-250)} />
        </View>
      </Card>

      <Card>
        <View style={styles.panel}>
          <Image
            resizeMode="contain"
            style={styles.stretch}
            source={require('../../assets/50iq.jpg')}
          />
          <Button
            style={{alignSelf: 'start'}}
            title={'+'}
            onPress={() => handleBtn(50)}
          />
          <Button title={'-'} onPress={() => handleBtn(-50)} />
        </View>
      </Card>
    </View>
  );
}

const stylesT = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  field: {
    width: '10%',
    flex: 1,
    flexDirection: 'column',
  },

  amountPanel: {
    maxHeight: 30,
    marginVertical: 15,
    justifyContent: 'flex-start',
  },
  card: {
    padding: 12,
    flex: 1,
  },
  cardBill: {
    padding: 12,
    flex: 3,
    maxHeight: 90,
  },
  container: {
    paddingTop: 50,
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  panel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: 150,
    height: 70,
    resizeMode: 'stretch',
  },
});
