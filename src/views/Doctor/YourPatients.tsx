import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import Consultas from '../../service/sqlite/Consultas';
import {colors} from '../../styles/styles';

export default () => {
  const Pacientes = Consultas.findPacintes(1).then(rows => {
    rows.forEach(row => {
      console.log(row);
    });
    console.log(rows);
    return rows;
  });

  const renderItem = (item) => {
    return <View style={styles.card}>
        <Text>{item.email}</Text>
    </View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Pacientes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 5,
    backgroundColor: colors.lighter,
    padding: 20,
    paddingHorizontal: 10,
    marginBottom: 16, // Adiciona espaçamento entre as linhas
    marginRight: 20, // Adiciona espaçamento entre as colunas
    marginLeft: 20, // Adiciona espaçamento entre as colunas
    gap: 10,
    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
