import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

const ProductList = ({ products, onItemPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onItemPress(item)}>
            <Text>{item.product_name}</Text>
            <Text>{item.short_description}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_name}
        />
    );
};

export default ProductList;
