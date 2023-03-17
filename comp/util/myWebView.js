import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebview = ({ url }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoadEnd = () => {
        setLoading(false);
    };


    const handleLoadError = () => {
        setLoading(false);
        setError(true);
    };

    const renderError = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Oops! Something went wrong.</Text>
            </View>
        );
    };

    setTimeout(() => {
        handleLoadEnd();
    }, 5000);

    return (
        <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator style={{ flex: 1 }} />}
            {error && renderError()}
            {<WebView
                source={{ uri: url }}
                onLoadEnd={handleLoadEnd}
                onError={handleLoadError}
                style={{ flex: 1, display: loading ? 'none' : 'flex' }}
            />}
        </View>
    );
};

export default MyWebview;
