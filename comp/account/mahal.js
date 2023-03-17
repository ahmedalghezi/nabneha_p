import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import TextInput from '../util/textInput';
import BarcodeReader from '../util/barcodeReader';

import {styles} from './recieve';

class Mahal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBtn: '',
    };
  }

  handleBtn = btnName => {
    this.setState({selectedBtn: btnName});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: 'flex-end',
            paddingVertical: 25,
            paddingHorizontal: 12,
          }}>
          يمكمنك استلام الاموال اما عن طريق قراءة الباركود او ادخال رمز الاستلام
        </Text>
        <View style={styles.panel}>
          <Button
            name={'pay'}
            type={this.state.selectedBtn === 'pay' ? 'solid' : 'outline'}
            title={'ادفع'}
            onPress={() => this.handleBtn('pay')}
          />
          <Button
            name={'get'}
            type={this.state.selectedBtn === 'get' ? 'solid' : 'outline'}
            title={'استلم'}
            onPress={() => this.handleBtn('get')}
          />
        </View>

        {this.state.selectedBtn === 'code' && (
          <View>
            <TextInput
              styel={styles.field}
              onChangeText={this.handleBtn}
              placeholder="رمز الاستلام"
              label="ادخل رمز الاستلام"
            />
            <Button
              id="receive_btn"
              title="تم"
              onPress={this.recieveWithCode}
            />
          </View>
        )}

        {this.state.showBarcodeReader && (
          <View style={styles.barcode}>
            <BarcodeReader gotBarcodeResult={this.gotBarcodeResult} />
          </View>
        )}

        {this.state.barcodeVal && this.state.selectedBtn === 'barcode' && (
          <View style={{paddingVertical: 20}}>
            <Text>{'رمز الاستلام:' + this.state.barcodeVal}</Text>
            <Button
              id="receive_by_barcode_btn"
              title="تم"
              onPress={this.recieveWithBarCode}
              style={{paddingVertical: 10}}
            />
          </View>
        )}

        {!this.state.showBarcodeReader && <View style={styles.endC} />}
      </View>
    );
  }
}

export default Mahal;
