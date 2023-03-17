import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

const TextInput = React.memo(({error, ...props}) => {
    return (
        <View style={styles.input}>
            <PaperTextInput mode="outlined" {...props} error={!!error} />

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
});

const styles = StyleSheet.create({
    input: {
        marginVertical: 6,
    },
    error: {
        color: '#DB2A30',
    }
});

export default TextInput;
