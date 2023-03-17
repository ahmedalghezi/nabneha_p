import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Poll = ({ question, choices, votes }) => {
    const [selectedChoice, setSelectedChoice] = useState(null);

    const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);

    const handleChoicePress = (index) => {
        if (selectedChoice !== index) {
            setSelectedChoice(index);
            votes[index]++;
        }
    };

    return (
        <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{question}</Text>
            {choices.map((choice, index) => {
                const voteCount = votes[index];
                const percentage = totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
                const barWidth = percentage * 2;

                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            borderWidth: 1,
                            borderColor: selectedChoice === index ? 'blue' : 'black',
                            backgroundColor: selectedChoice === index ? 'lightblue' : 'white',
                            padding: 10,
                            marginVertical: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={() => handleChoicePress(index)}
                    >
                        <Text style={{ flex: 1, textAlign: 'right' }}>{choice}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    height: 10,
                                    width: barWidth,
                                    backgroundColor: 'blue',
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                            />
                            <Text>{percentage}%</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default Poll;
