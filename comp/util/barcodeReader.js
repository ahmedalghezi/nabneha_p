import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import styles from "react-native-webview/lib/WebView.styles";
import Constants from "expo-constants";
import {Icon} from "@rneui/themed";

export default function BarcodeReader(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
       // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        props.gotBarcodeResult(data,type);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function handleClose(){
        if(props.gotBarcodeResult){
            props.gotBarcodeResult("");
        }
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity onPress={handleClose}>
            <Image  source={require('../../assets/x_icon.png')} style={{
                width:24,
                height:20,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 100
            }}/>
            </TouchableOpacity>

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },


});



