import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import Consultas from '../../service/sqlite/Consultas';
import {colors} from '../../styles/styles';
import IPaciente from '../../interface/IPaciente';

export default () => {
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const rows = await Consultas.findPacientes(1);
        setPacientes(rows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const renderItem = ({item}: {item: IPaciente}) => {
    return (
      <View style={styles.card}>
        <View style={styles.id}>
          <Text>
            <Text style={styles.textDest}>ID Paciente: </Text>#{item.id}
          </Text>
        </View>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Nome: </Text>
          {item.nome}
        </Text>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Email: </Text>
          {item.email}
        </Text>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Telefone: </Text>
          {item.telefone}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pacientes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  id: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textBox: {
    fontSize: 18,
  },
  textDest: {
    fontWeight: '900',
    fontSize: 16,
  },
});
