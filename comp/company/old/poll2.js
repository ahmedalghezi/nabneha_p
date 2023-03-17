import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Poll = ({ question, choices, results }) => {
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);

    const handleChoicePress = (index) => {
        setSelectedChoiceIndex(index);
    };

    const calculatePercentage = (result, total) => {
        if (total === 0) {
            return 0;
        }
        return Math.round((result / total) * 100);
    };

    const totalVotes = results.reduce((sum, result) => sum + result, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            {choices.map((choice, index) => {
                const result = results[index];
                const percentage = calculatePercentage(result, totalVotes);
                const isChoiceSelected = selectedChoiceIndex === index;
                return (
                    <View key={index} style={styles.choiceContainer}>
                        <TouchableOpacity
                            onPress={() => handleChoicePress(index)}
                            style={[
                                styles.choice,
                                isChoiceSelected && styles.selectedChoice,
                            ]}
                        >
                            {isChoiceSelected && (
                                <View
                                    style={[
                                        styles.selectedChoiceBar,
                                        { width: `${percentage}%` },
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.choiceText}>{choice}</Text>
                        {isChoiceSelected && (
                            <Text style={styles.choicePercentage}>{percentage}%</Text>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    choiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    choice: {
        height: 20,
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#eee',
        overflow: 'hidden',
    },
    selectedChoice: {
        backgroundColor: 'blue',
    },
    selectedChoiceBar: {
        height: 20,
        backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    choiceText: {
        color: '#333',
        marginLeft: 8,
    },
    choicePercentage: {
        color: 'white',
        marginLeft: 8,
    },
});

export default Poll;
