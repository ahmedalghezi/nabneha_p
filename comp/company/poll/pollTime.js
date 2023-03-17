import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
//import {MaterialCommunityIcons} from '@expo/vector-icons';

const PollTime = ({endTime}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeLeft() {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference < 0) {
      return {expired: true};
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {days, hours, minutes, seconds};
  }

  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }

  function renderTimeLeft() {
    if (timeLeft.expired) {
      return (
        <>
          {/*<MaterialCommunityIcons name="lock-outline" size={20} color="#555" />*/}
          <Text style={{color: '#555', marginLeft: 5}}>
            التصويت انتهى في {new Date(endTime).toLocaleString()}
          </Text>
        </>
      );
    }

    return (
      <>
        <Text style={{fontWeight: 'bold'}}>{formatTime(timeLeft.days)}</Text>
        <Text> Days </Text>
        <Text style={{fontWeight: 'bold'}}>{formatTime(timeLeft.hours)}</Text>
        <Text> Hours </Text>
        <Text style={{fontWeight: 'bold'}}>{formatTime(timeLeft.minutes)}</Text>
        <Text> Minutes </Text>
        <Text style={{fontWeight: 'bold'}}>{formatTime(timeLeft.seconds)}</Text>
        <Text> Seconds Left</Text>
      </>
    );
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {renderTimeLeft()}
    </View>
  );
};

export default PollTime;
