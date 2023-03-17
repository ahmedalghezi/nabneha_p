

//import getApp from "../util/firebaseConfig";
import { StyleSheet, Text, View} from "react-native";
import {Button, Input} from '@rneui/themed';
import React, {Component} from "react";
import Post from "../../DB/post";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from "expo-constants";
import TextInput from "../util/textInput";

import BarcodeReader from "../util/barcodeReader";
import Amount from "./amount";
import {useNavigation} from "@react-navigation/native";
import PendingTransfer from "./pendingTransfer";





class Transfer extends Component {


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
            amount:0,
            showPendingTransaction:false
        };
    }


    componentDidMount() {
        this.readStoredData().then(r => {
            //this.getInfo();
        });
    }


/*
    getInfo(){
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
            alert("Some error has happened, code tra68");
        });
    }
*/


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

        if(val === "mobile")
            this.setState({showPendingTransaction:true});
        else
            this.setState({showPendingTransaction:false});

        switch (val) {
            case "mobile":
                break;
            case "barcode":
                break;

        }
    }


    transferWithCode = () =>{
        Post.transferWithCode({"transfer_code":this.state.code, amount:this.state.amount}).then(response => {
            if(response.data.res === "ok"){
                const str = " تم تحويل ";
                const amount = response.data.receivedAmount;
                const dinar = " دينار "
                if(this.props.onDone){
                    this.props.onDone();
                }
                return;
            }else{
                const str1 = "فشل العملية";
                const str2 = "..."+response.data.msg;
                alert(str1+str2);
                return;
            }
        });
    }
    transferWithBarCode = () =>{
        Post.transferWithBarCode({"transfer_code":this.state.barcodeVal, amount:this.state.amount}).then(response => {
            if(response.data.res === "ok"){
                const str = " تم تحويل ";
                const amount = response.data.receivedAmount;
                const dinar = " دينار "
                alert(str + amount + dinar);
                if(this.props.onDone){
                    this.props.onDone();
                }
                return;
            }else{
                const str1 = "فشل العملية";
                const str2 = "..."+response.data.msg;
                alert(str1+str2);
                return;
            }
        });
    }

    gotBarcodeResult = (code,type) =>{
        this.setState({showBarcodeReader:false});
        this.setState({barcodeVal:code});
    }
    changeRecCode = (newText) =>{
        this.setState({code:newText});
    }

    onAmountUpdated = (amountVal) =>{
        this.setState({amount:amountVal})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{alignSelf: "flex-end",  paddingVertical:25,paddingHorizontal:12}}> لمن ترغب بالتحويل؟</Text>
                <View style={styles.panel}>
                    <Button onPress={() => this.handleBtn("mobile")} key ={"mobile"} type={this.state.selectedBtn==="mobile"?"solid":"outline"} title={"لرقم موبايل"} />
                    <Button name ={"code"} type={this.state.selectedBtn==="code"?"solid":"outline"} title={"رمز المستلم"}  onPress={() => this.handleBtn("code")}/>
                    <Button name ={"barcode"} type={this.state.selectedBtn==="barcode"?"solid":"outline"} title={"لباركود"} onPress={() => this.handleBtn("barcode")}/>
                </View>


                {this.state.selectedBtn === "code" && <View>
                    <TextInput styel={styles.field}    onChangeText={newText => this.changeRecCode(newText)}  placeholder="رمز المستلم" label="ادخل رمز المستلم" />
                    <Button id="sign-in-button" title="حول" onPress={this.transferWithCode} />
                </View>}


                {this.state.showBarcodeReader && <View style={styles.barcode}>
                    <BarcodeReader gotBarcodeResult={this.gotBarcodeResult}/>
                </View>}



                {this.state.barcodeVal && this.state.selectedBtn === "barcode"&&
                    <View style={{paddingVertical:20}}>
                        <Text>{"كود المستلم:"+this.state.barcodeVal}</Text>
                    <Button id="sign-in-button" title="حول" onPress={this.transferWithBarCode} style={{paddingVertical:10}}/>
                </View>}


                {this.state.showPendingTransaction && <PendingTransfer amount={this.state.amount}/>}

                <Amount onAmountUpdated = {this.onAmountUpdated}/>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    field:{
        width:"10%",
        flex: 1
    },
    endC: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: 'white',
        padding: 8,
        height:"30%"

    },
    form:{
        flex: 1,
        paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: 'white',
        padding: 8,
        maxHeight:"10"
    },


    barcode:{
        flex: 1,
        width: "100%",
        height:"100%",
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
        paddingTop: Constants.statusBarHeight + 24,
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




const TransferFunc = (props) => {
    const navigation = useNavigation();
    function onDoneTransfer() {
        navigation.navigate('الرئيسة');
        if(props.onTransferDone){
            props.onTransferDone();
        }
    }
    return(
        <Transfer onDone = {onDoneTransfer}/>
    );
}


export default TransferFunc;
