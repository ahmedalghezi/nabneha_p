import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';

const StoreMap = () => {
    const [storeData, setStoreData] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        fetch('https://inprove-sport.info/jizdan/getStores')
            .then(response => response.json())
            .then(data => setStoreData(data))
            .catch(error => console.log(error));
    }, []);

    const onMarkerPress = (store) => {
        setSelectedStore(store);
    }

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Address</DataTable.Title>
                    <DataTable.Title>Phone</DataTable.Title>
                    <DataTable.Title>GPS</DataTable.Title>
                </DataTable.Header>

                {storeData.map((store, index) => (
                    <DataTable.Row key={index} onPress={() => onStorePress(store)}>
                        <DataTable.Cell>{store.name}</DataTable.Cell>
                        <DataTable.Cell>{store.address}</DataTable.Cell>
                        <DataTable.Cell>{store.phone}</DataTable.Cell>
                        <DataTable.Cell>{`${store.location.latitude}, ${store.location.longitude}`}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            <MapView
                style={styles.map}
                /*initialRegion={{
                    latitude: storeData[0].location.latitude,
                    longitude: storeData[0].location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}*/
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '70%',
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
