import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';

const StoreMap = () => {
    const [storeData, setStoreData] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [region, setRegion] = useState({
        latitude: storeData[0]?.location.latitude,
        longitude: storeData[0]?.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        fetch('https://inprove-sport.info/jizdan/getStores')
            .then(response => response.json())
            .then(data => setStoreData(data))
            .catch(error => console.log(error));
    }, []);

    const onMarkerPress = (store) => {
        setSelectedStore(store);
        setRegion({
            ...region,
            latitude: store.location.latitude,
            longitude: store.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    const onStorePress = (store) => {
        setSelectedStore(store);
        setRegion({
            ...region,
            latitude: store.location.latitude,
            longitude: store.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true} style={{maxHeight:"50%"}}>
            <DataTable style={{maxHeight:"30%"}}>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Address</DataTable.Title>
                    <DataTable.Title>Phone</DataTable.Title>

                </DataTable.Header>

                {storeData.map((store, index) => (
                    <DataTable.Row key={index} onPress={() => onStorePress(store)}>
                        <DataTable.Cell>{store.name}</DataTable.Cell>
                        <DataTable.Cell>{store.address}</DataTable.Cell>
                        <DataTable.Cell>{store.phone}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            </ScrollView>
            <MapView
                style={styles.map}
                region={region}
            >
                {storeData.map((store, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: store.location.latitude,
                            longitude: store.location.longitude,
                        }}
                        title={store.name}
                        description={store.address}
                        onPress={() => onMarkerPress(store)}
                    />
                ))}
            </MapView>
            {selectedStore && (
                <View style={styles.popup}>
                    <Text>{selectedStore.name}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '40%',
        maxHeight:'70%'
    },
    popup: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
});

export default StoreMap;
