

//import getApp from "../util/firebaseConfig";
import {BackHandler, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Input} from '@rneui/themed';
//import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";
import React, {Component} from "react";
import Post from "../../DB/post";

import AsyncStorage from '@react-native-async-storage/async-storage';
//import QRCode from "react-native-qrcode-svg";
//import Constants from "expo-constants";
//import {Field, Form, Submit} from "react-swift-form";
import TextInput from "../util/textInput";
import BarcodeReader from "../util/barcodeReader";
import Amount from "./amount";



class Receive extends Component {


    constructor(props) {
        super(props);
        this.state = {
            receiverCode: "bad code",
            giveCode:"bad code",
            taking:true,
            selectedBtn:"",
            showBarcodeReader:false,
            barcodeVal:null,
            code:"",
            amount:0
        };
    }


    componentDidMount() {
        this.readStoredData().then(r => {
            this.getInfo();
        });
    }





    openBarCodeReader(){

    }



    async getInfo() {

        Post.getCurrentBalance().then(response => {
            if(response.data.res === "error") {
                alert("error code Bl20");
                return;
            }
            if(response.data.res === "no"){
                alert("يرجى التسجيل اولاً");
                return;
            }
            if(response.data.res === "ok") {
                this.setState({receiverCode:response.data.receiverCode});
                this.setState({giveCode:response.data.giveCode});
                this.storeData(response.data.receiverCode,response.data.giveCode);
            }

        }).catch(e => {
            console.log(e);
            alert("Some error has happened, code recie73");
        });
    }



     storeData = async (receiverCode,giveCode) => {
        try {
            await AsyncStorage.setItem('@receiverCode', value);
            await AsyncStorage.setItem('@giveCode', giveCode);
        } catch (e) {
            // saving error
        }
    }

    readStoredData = async () => {
        try {
            const value = await AsyncStorage.getItem('@receiverCode')
            if(value !== null) {
                this.setState({receiverCode:value});
            }
            const value2 = await AsyncStorage.getItem('@giveCode')
            if(value2 !== null) {
                this.setState({receiverCode:value2});
            }
        } catch(e) {
            // error reading value
        }
    }


    handleBtn = (val) =>{
        this.setState({selectedBtn:val});
        if(val === "barcode")
            this.setState({showBarcodeReader:true});
        else
            this.setState({showBarcodeReader:false});
        switch (val) {
            case "mobile":
                break;
            case "barcode":
                break;

        }
    }

    changeRecCode = (newText) =>{
        this.setState({code:newText});
    }


    recieveWithCode = () =>{
        Post.recieveWithCode({"receive_code":this.state.code,amount:this.state.amount}).then(response => {
            if(response.data.res === "ok"){
                const str = " تم استلام ";
                const amount = response.data.receivedAmount;
                const dinar = " دينار "
                alert(str + amount + dinar);
                return;
            }else{
                alert("فشل العملية");
                return;
            }
        });

    }


    recieveWithBarCode = () =>{
        Post.recieveWithBarCode({"receive_code":this.state.barcodeVal,amount:this.state.amount}).then(response => {
            if(response.data.res === "ok"){
                const str = " تم استلام ";
                const amount = response.data.receivedAmount;
                const dinar = " دينار "
                alert(str + amount + dinar);
                return;
            }else{
                alert("فشل العملية");
                return;
            }
        });
    }

    gotBarcodeResult = (code,type) =>{
        this.setState({showBarcodeReader:false});
        this.setState({barcodeVal:code});
    }

    onAmountUpdated = (amountVal) =>{
        this.setState({amount:amountVal})
    }


     SelectedTab = () => {
        switch(selectedTab){
            case 'A':
                return <ComponentA />
            case 'B':
                return <ComponentB />
            case 'C':
                return <ComponentC />
            default:
                return /* empty div maybe */
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <Text style={{textAlign: 'right',  paddingVertical:25,paddingHorizontal:12}}>يمكنك استلام الاموال اما عن طريق قراءة الباركود او ادخال رمز الاستلام</Text>
                <View style={styles.panel}>
                    <Button name ={"code"} type={this.state.selectedBtn==="code"?"solid":"outline"} title={"رمز الاستلام"}  onPress={() => this.handleBtn("code")}/>
                    <Button name ={"barcode"} type={this.state.selectedBtn==="barcode"?"solid":"outline"} title={"لباركود"} onPress={() => this.handleBtn("barcode")}/>
                </View>


                {this.state.selectedBtn === "code" && <View>
                    <TextInput styel={styles.field}   onChangeText={newText => this.changeRecCode(newText)} placeholder="رمز الاستلام" label="ادخل رمز الاستلام" />
                    <Button id="receive_btn" title="تم" onPress={this.recieveWithCode}/>
                </View>}


                {this.state.showBarcodeReader && <View style={styles.barcode}>
                    <BarcodeReader gotBarcodeResult={this.gotBarcodeResult}/>
                </View>}



                {this.state.barcodeVal && this.state.selectedBtn === "barcode"&&
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 5,
                        flexGrow: 1,
                        maxHeight:50
                    }}>
                        <Text style={{maxWidth:'50%',alignSelf:"flex-end",marginHorizontal:20}}>{"رمز الاستلام:"+this.state.barcodeVal}</Text>
                    <Button title=" تم " onPress={this.recieveWithBarCode} style={styles.button}/>
                </View>}

                <Amount onAmountUpdated = {this.onAmountUpdated}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    button:{
        padding:40
    },

    buttonContainers: {
            zIndex: 1,
            alignSelf: 'flex-end',
            position: 'absolute',
            top:5,
            right: 5,
            height: 40,
            borderWidth: 1,
            justifyContent: 'center',
            alignContent: 'center',
            width: 80
        },


    field:{
        width:"10%",
        flex: 1
    },
    endC: {
        flex: 1,
        //paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: 'white',
        padding: 8
    },
    form:{
        flex: 1,
       // paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: 'white',
        padding: 8,
        maxHeight:"10"
    },


    barcode:{
        flex: 1,
        width: "100%",
        height:"90%",
        minHeight:"80%"
    },

    panel:{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        maxHeight:50,
        justifyContent:"space-around"
    },

    container2: {
        flex: 1,
       // paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: '#ecf0f1',
        padding: 8,

    },
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    card: {
        padding: 12,
    },
    featuredDetails: {
        position: "center",
        flexDirection: "column",
        marginLeft: 25,
        margin: 25,
        marginBottom: 8,
        alignItems:"center"
    }
});


export default Receive
export  {styles};
