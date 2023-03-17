import React from 'react';
import { View } from 'react-native';
import Poll from './poll4';
import PollTime from "./pollTime";

const TempPoll = () => {
    const question = 'What is your favorite color?';
    const choices = ['Red', 'Green', 'Blue', 'Yellow'];
    const results = [35, 3, 7, 2];

    const d = new Date();
    d.setHours(d.getHours() - 2);


    const pollQuestion = 'ما هو لونك المفضل؟';
    const pollChoices = [
        { id: '0', label: 'JavaScript' },
        { id: '1', label: 'Python' },
        { id: '2', label: 'Java' },
        { id: '3', label: 'C++' },
    ];

    const votes = [5, 3, 2, 1];
    const selectedChoice = '1';
    const handleChoicePress = (choiceId) => {
        const index = pollChoices.findIndex((choice) => choice.id === choiceId);
        setSelectedChoice(index);
        votes[index] += 1;
    };

    return (
        <View>
            {/*<Poll question={question} choices={choices} results={results} />*/}
            {/*


            <Poll
                question="What is your favorite color?"
                choices={[{id:1,label:'Red'}, {id:1,label:'green'}, {id:1,label:'Yeloow'}, {id:1,label:'Blue'}]}
                votes={[10, 5, 3, 2]}
                endTime={d.getTime()}
                selectedChoiceId={1}
                />

            */}



            {

                <Poll
                    question={pollQuestion}
                    choices={pollChoices}
                    selectedChoiceId={selectedChoice}
                    onChoicePress={handleChoicePress}
                    votes={votes}
                    endTime={d.getTime()}
                />


            }
        </View>
    );
};

export default TempPoll;
