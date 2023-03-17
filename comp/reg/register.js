import { StatusBar } from "expo-status-bar";
import React, {useEffect, useRef, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Register(props) {


    const [start, setStart] = useState(true);
    const [ID, setID] = useState();
    const [ini, setIni] = useState(false);

    const webviewRef = useRef();

    useEffect(() => {
        if(ini)
            return;
        setIni(true);

       /*/* if(!ID)
            return;
        if(start)
            sendDataToWebView(getID());
        setStart(false);
        */
    });



   /* async function getID() {
        let ID = await getSavedPersonalCode();
        if (!ID) {
            ID = getRandomID();
            storeID(ID);
        }
        return ID;

    }*/


//Not working!!! use url param instead!!
    function sendDataToWebViewProduct(ID,phone) {
        webviewRef.current.postMessage({native:true,ID:ID,callerName:"registerProduct",phone:phone});
    }

    /*const storeID = async (ID) => {
        try {
            await AsyncStorage.setItem('@regID', ID);
        } catch (e) {
            // saving error
        }
    }*/



    const storePhone = async (phone) => {
        try {
            if(!props.phoneProduct)
                await AsyncStorage.setItem('@phone', phone);
        } catch (e) {
            // saving error
        }
    }








    const storePersonalCode = async (code) => {
        try {
            await AsyncStorage.setItem('@personalCode', code);
        } catch (e) {
            // saving error
        }
    }




    async function onMessage(data) {
        console.log(data.nativeEvent.data);
        if(!data.nativeEvent.data.includes("code:"))
            return;
        const phone = data.nativeEvent.data.split("code:")[0];
        const personalCode = data.nativeEvent.data.split("code:")[1];
        await storePhone(phone);
        await storePersonalCode(personalCode);
        if(props.onRegister)
            props.onRegister({code:personalCode, phone:phone});
    }


    function getRandomID(){
        const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()+=!";
        const pwdLen = Math.floor(Math.random() * (Math.floor(21) - Math.ceil(10)) + Math.ceil(10));
        const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
        return randPassword;
    }

    return (
        <WebView
            style={styles.container}
            source={props.phoneProduct?{uri: 'https://inprove-sport.info/reg/jizdan/reg/?phone='+props.phoneProduct}:{uri: 'https://inprove-sport.info/reg/jizdan/reg'}}
            scalesPageToFit={false}
            mixedContentMode="compatibility"
            onMessage={onMessage}
        />
    );
}

/*const getStoredID = async () => {
    try {
        const value = await AsyncStorage.getItem('@getID');
        return value;
    } catch(e) {
        // error reading value
        return null;
    }
}*/

const getPersonalCode = async () => {
    try {
        const value = await AsyncStorage.getItem('@personalCode');
        return value;
    } catch(e) {
        // error reading value
        return null;
    }
}

const getStoredPhone = async () => {
    try {
        const value = await AsyncStorage.getItem('@phone');
        return value;
    } catch(e) {
        // error reading value
        return null;
    }
}


export async function getSavedPersonalCode() {
    return await getPersonalCode();
}


export async function getSavedPhone(){
    return await getStoredPhone();
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default {Register,getSavedId: getSavedPersonalCode}

