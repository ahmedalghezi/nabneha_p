import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PollChoice = ({ text, count, totalVotes, percentage, selected, onPress }) => {
    const containerStyle = [styles.container];
    if (selected) {
        containerStyle.push(styles.containerSelected);
    }

    const countText = `${count} vote${count !== 1 ? 's' : ''}`;
    const percentageText = `${percentage.toFixed(1)}%`;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.count}>{countText}</Text>
                <Text style={styles.percentage}>{percentageText}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingRight: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 8,
    },
    containerSelected: {
        borderColor: '#007AFF',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
    },
    text: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 20,
    },
    count: {
        marginRight: 10,
    },
    percentage: {
        fontWeight: 'bold',
    },
});

export default PollChoice;
