
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import WebView from "react-native-webview";
import {Card} from "react-native-paper";
import {Button} from "@rneui/themed";

export default function testQ() {

    function onMessage(data) {
        alert(data.nativeEvent.data);
    }

    const HorizontalPanel = () => {
        return (
            <Card>
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>
                    <Image
                        source={require('../../assets/50iq.jpg')}
                        style={{width: 150, height: 70}}
                        resizeMode='contain'
                    />
                    <TouchableOpacity style={stylesT.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesT.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    }


    return (

        <View>

            <Card>
                <View style={styles.panel}>
                    <Image resizeMode='contain'  style={styles.stretch} source={require('../../assets/1000iq.jpeg')}/>
                    <Button style={{alignSelf: "start"}} title={"+"} onPress={() => handleBtn(1000)}  />
                    <Button title={"-"} onPress={() => handleBtn(-1000)} />
                </View>
            </Card>

            <HorizontalPanel/>


            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/50iq.jpg')}
                        style={{ width: 100, height: 70 }}
                        resizeMode='contain'
                    />
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Text>Button 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Text>Button 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Text>Button 3</Text>
                    </TouchableOpacity>
                </View>

            </Card>

            <WebView
                style={styles.container}
                source={{uri: 'http://localhost:3000/'}}
                scalesPageToFit={false}
                mixedContentMode="compatibility"
                onMessage={onMessage}
            />

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
