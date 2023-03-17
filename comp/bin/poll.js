import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated  } from 'react-native';
import RNPoll, { IChoice } from "react-native-poll";
//import RNAnimated from "react-native-animated-component";
const choices: Array<IChoice> = [
    { id: 1, choice: "Nike", votes: 12 },
    { id: 4, choice: "Reebok", votes: 5 },
    { id: 5, choice: "Under Armour", votes: 9 },
];

const Poll = (props) => {
    const [poll, setPoll] = useState({});
    const [voted, setVoted] = useState(false);

    //const [poll, setPoll] = useState(null);

    const [barWidth, setBarWidth] = useState(new Animated.Value(0));



    useEffect(() => {
        // Fetch poll object from server
        const fetchPoll = async () => {
            try {
                const response = await fetch(`https://inprove-sport.info/polls/${props.pollId}`);
                const data = await response.json();
                setPoll(data);
            } catch (error) {
                console.error(error);
                setPoll({
                    question: 'What is your favorite color?',
                    choices: [
                        { choice: 'Red', votes: 20 },
                        { choice: 'Blue', votes: 10 },
                        { choice: 'Green', votes: 15 },
                    ],
                    totalVotes: 45,
                });
            }
        };

        fetchPoll();
    }, []);

    const handleVote = (choice) => {
        // Update the number of votes for the selected choice
        setPoll({
            ...poll,
            choices: poll.choices.map((c) => {
                if (c.choice === choice) {
                    return { ...c, votes: c.votes + 1 };
                }
                return c;
            }),
        });

        setVoted(true);
        Animated.timing(barWidth, {
            toValue: (choice.votes / poll.totalVotes) * 100,
            duration: 500,
        }).start();
    };

    if (!poll.question) {
        return <Text>Loading...</Text>;
    }




    return (
        <View>


            <Text>{poll.question}</Text>
            {poll.choices.map((choice) => (
                <TouchableOpacity key={choice.choice} style={styles.choiceCard} onPress={() => handleVote(choice)}>
                    <View style={styles.choiceContainer}>
                        {voted ? (
                            <Animated.View style={[styles.bar, { width: barWidth }]}>
                                <Text style={styles.barText}>{choice.choice}</Text>
                            </Animated.View>
                        ) : (
                            <Text>{choice.choice}</Text>
                        )}
                    </View>
                    <View style={styles.choicePercentageContainer}>
                        <Text style={styles.choicePercentage}>{(choice.votes / poll.totalVotes * 100).toFixed(1)}%</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};



const styles = StyleSheet.create({
    choiceCard: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    choiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    bar: {
        height: 20,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barText: {
        color: 'white',
        textAlign: 'left',
    },
    barPercentage: {
        color: 'white',
        width: '20%',
    },
    choicePercentageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    choicePercentage: {
        color: 'black',
        marginTop: 5,
    },
});





export default Poll;
