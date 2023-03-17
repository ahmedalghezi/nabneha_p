import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';

import{Table, TableWrapper, Row } from 'react-native-table-component'
import MapView, { Marker } from 'react-native-maps';

const StoresList = () => {
    const [stores, setStores] = useState([]);
    const [sort, setSort] = useState('name');
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        fetch('https://inprove-sport.info/jizdan/getStores')
            .then(response => response.json())
            .then(data => {
                setStores(data);
            });
    }, []);

    const sortStores = (sort) => {
        if (sort === 'name') {
            setStores([...stores].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (sort === 'location') {
            setStores([...stores].sort((a, b) => {
                if (a.location.latitude === b.location.latitude) {
                    return a.location.longitude - b.location.longitude;
                }
                return a.location.latitude - b.location.latitude;
            }));
        } else if (sort === 'date') {
            setStores([...stores].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
        }
        setSort(sort);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => sortStores('name')}>
                <Text>Sort by Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortStores('location')}>
                <Text>Sort by Location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortStores('date')}>
                <Text>Sort by Date</Text>
            </TouchableOpacity>
            <ScrollView>
                <Table>
                    <Row data={['Name', 'Address', 'Phone', 'Date']} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    {stores.map((store) => (
                        <TouchableOpacity
                            key={store.id}
                            onPress={() => setSelectedStore(store)}
                        >
                            <TableWrapper key={store.id} style={styles.row}>
                                <Text style={styles.text}>{store.name}</Text>
                                <Text style={styles.text}>{store.address}</Text>
                                <Text style={styles.text}>{store.phone}</Text>
                                <Text style={styles.text}>{store.created_at}</Text>
                            </TableWrapper>
                        </TouchableOpacity>
                    ))}
                </Table>
            </ScrollView>
            <MapView
                style={{ flex: 1 }}
                /*initialRegion={{
                    latitude: selectedStore ? selectedStore.location.latitude : stores[0].location.latitude,
                    longitude: selectedStore ? selectedStore.location.longitude : stores[0].location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}*/
            >
                {selectedStore && (
                    <Marker
                        coordinate={{
                            latitude: selectedStore.location.latitude,
                            longitude: selectedStore.location.longitude,
                        }}
                        title={selectedStore.name}
                    />
                )}
            </MapView>
        </View>
    );


};


const styles = {
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: 'white' },
};


export default StoresList;
