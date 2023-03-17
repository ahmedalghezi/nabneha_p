import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import PollTime from './pollTime';

const Poll = ({question, choices, votes, endTime, selectedChoiceId}) => {
  const [selectedChoice, setSelectedChoice] = useState(selectedChoiceId);

  const totalVotes = votes.reduce((acc, cur) => acc + cur, 0);
  const votePercentages = votes.map(count =>
    totalVotes === 0 ? 0 : (count / totalVotes) * 100,
  );

  const handleChoicePress = index => {
    setSelectedChoice(index);
    votes[index] += 1;
  };

  const renderChoice = choice => {
    const isChosen = selectedChoice === choice.id;
    const percentage = votePercentages[choice.id].toFixed(2);

    return (
      <TouchableOpacity
        key={choice.id}
        onPress={() => handleChoicePress(choice.id)}
        disabled={new Date() > new Date(endTime)}
        style={{
          backgroundColor: isChosen ? '#1abc9c' : '#f1f1f1',
          padding: 4,
          marginBottom: 4,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: isChosen ? '#16a085' : 'transparent',
        }}>
        <Text
          style={{
            textAlign: 'right',
            fontWeight: isChosen ? 'bold' : 'normal',
            color: isChosen ? '#fff' : '#333',
          }}>
          {choice.label}
        </Text>
        {isChosen && (
          <Text style={{marginTop: 8, fontWeight: 'bold', marginBottom: 8}}>
            {percentage}% of {totalVotes} votes
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderResults = () => {
    if (selectedChoice === null) {
      return null;
    }

    const chartData = votePercentages.map(percentage =>
      parseFloat(percentage.toFixed(2)),
    );

    const maxVotes = Math.max(...votes);
    const highlightColor = '#1abc9c';
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      barPercentage: 0.8,
      useShadowColorFromDataset: false,
      decimalPlaces: 2,
    };
    const dataset = {
      data: chartData,
    };
    const labels = choices.map(choice => choice.label);

    return (
      <View style={{marginTop: 16}}>
        <Text style={{fontWeight: 'bold', marginBottom: 8}}>النتيجة:</Text>
        <BarChart
          data={{
            labels: labels,
            datasets: [dataset],
          }}
          width={300}
          height={200}
          yAxisLabel="%"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={{
            marginVertical: 8,
            borderRadius: 8,
            alignSelf: 'center',
          }}
          decorator={() => {
            return dataset.data.map((value, index) => {
              if (votes[index] === maxVotes) {
                return {
                  position: 'absolute',
                  backgroundColor: highlightColor,
                  height: `${value}%`,
                  width: '100%',
                  bottom: 0,
                  left: 0,
                };
              }
            });
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    setSelectedChoice(selectedChoiceId);
  }, [selectedChoiceId]);

  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 16,
          alignText: 'right',
        }}>
        {question}
      </Text>
      {choices.map(choice => renderChoice(choice))}
      {renderResults()}
      <PollTime endTime={endTime} />
      {new Date() > new Date(endTime) && (
        <Text style={{fontWeight: 'bold', marginTop: 16}}>
          This poll has ended.
        </Text>
      )}
    </View>
  );
};

export default Poll;
