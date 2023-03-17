import React from 'react';
import ProductList from './productList2';

const MyComponent = () => {
    const products = [
        {
            image_url: 'https://picsum.photos/200',
            product_name: 'Product 1',
            short_description: 'This is a short description of product 1',
        },
        {
            image_url: 'https://picsum.photos/200',
            product_name: 'Product 2',
            short_description: 'This is a short description of product 2',
        },
        {
            image_url: 'https://picsum.photos/200',
            product_name: 'Product 3',
            short_description: 'This is a short description of product 3',
        },
    ];

    const handleItemPress = (item) => {
        console.log(`Selected item: ${item.product_name}`);
    };

    return (
        <ProductList products={products} onItemPress={handleItemPress} />
    );
};

export default MyComponent;
