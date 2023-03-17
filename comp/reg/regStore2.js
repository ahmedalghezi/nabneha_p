import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const StoreInfo = () => {
    const [storeName, setStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState({});
    const [error, setError] = useState({
        storeName: false,
        address: false,
        phone: false
    });
    const [message, setMessage] = useState("");

    const getLocation = async () => {
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
        });
    };

    const validate = () => {
        let error = {};
        let isValid = true;

        if (storeName.trim() === "") {
            error.storeName = true;
            isValid = false;
        }

        if (address.trim() === "") {
            error.address = true;
            isValid = false;
        }

        if (phone.trim() === "") {
            error.phone = true;
            isValid = false;
        }

        setError(error);
        return isValid;
    }

    const postStoreData = () => {
        if (validate()) {
            axios.post('https://inprove-sport.info/jizdan/registerStore', {
                name: storeName,
                address: address,
                phone: phone,
                location: location
            })
                .then(response => {
                    setMessage("Data successfully posted.");
                    setStoreName("");
                    setAddress("");
                    setPhone("");
                    setLocation({});
                })
                .catch(error => {
                    setMessage("Error posting data.");
                    console.log(error);
                });
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error.storeName && styles.error]}
                placeholder="Store Name"
                value={storeName}
                onChangeText={(text) => setStoreName(text)}
            />
            <TextInput
                style={[styles.input, error.address && styles.error]}
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />
            <TextInput
                style={[styles.input, error.phone && styles.error]}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity style={styles.button} onPress={getLocation}>
                <Text style={styles.buttonText}>Get Location</Text>
            </TouchableOpacity>
            <View>
                <Text>Latitude: {location.latitude}</Text>
                <Text>Longitude: {location.longitude}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={postStoreData}>
                <Text style={styles.buttonText}>Post Data</Text>
            </TouchableOpacity>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
    },
    error: {
        borderColor: 'red',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    message: {
        marginVertical: 10,
        color: 'green'
    }
});


export default StoreInfo;
