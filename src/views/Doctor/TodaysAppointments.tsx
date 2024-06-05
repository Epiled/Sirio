import React from 'react';
import {Text, View} from 'react-native';
import Consultas from '../../service/sqlite/Consultas';

export default () => {
  const TodayList = Consultas.todayList(4).then(rows => {
    rows.forEach(row => {
      console.log(row, 'Teste');
    });
  });

  return (
    <View>
      <Text>1</Text>
    </View>
  );
};
