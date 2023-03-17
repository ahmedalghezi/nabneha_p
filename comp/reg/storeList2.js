




import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';

const StoreFinder = () => {
    const [storeData, setStoreData] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        fetch('https://inprove-sport.info/jizdan/getStores')
            .then(response => response.json())
            .then(data => setStoreData(data))
            .catch(error => console.log(error));
    }, []);

    const onStorePress = (store) => {
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
                    </DataTable.Row>
                ))}
            </DataTable>
            {selectedStore && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: selectedStore.location.latitude,
                        longitude: selectedStore.location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: selectedStore.location.latitude,
                            longitude: selectedStore.location.longitude,
                        }}
                        title={selectedStore.name}
                        description={selectedStore.address}
                    />
                </MapView>
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
});

export default StoreFinder;

