import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Consultas from '../../service/sqlite/Consultas';
import {colors} from '../../styles/styles';
import {Consulta} from '../../types/TypeConsulta';
import {services} from '../../db/services';
import randomId from '../../../util/randomId';
import Pacientes from '../../service/sqlite/Pacientes';

export default () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [pacientes, setPacientes] = useState({});

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const consultasData = await Consultas.todayList(1);
        setConsultas(consultasData);

        const pacientesData = {};
        for (let consulta of consultasData) {
          console.log(consulta.idPaciente);
          if (!pacientesData[consulta.idPaciente]) {
            pacientesData[consulta.idPaciente] = await Pacientes.findById(
              consulta.idPaciente,
            );
          }
        }
        setPacientes(pacientesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  const renderItem = ({item}: {item: Consulta}) => {
    const paciente = pacientes[item.idPaciente];
    console.log(paciente.nome);

    return (
      <View style={styles.card}>
        <View style={styles.id}>
          <Text>
            <Text style={styles.textDest}>ID Consulta: </Text>#{item.id}
          </Text>
        </View>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Paciente: </Text>
          {paciente?.nome}
        </Text>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Tratamento: </Text>
          {services[item.idService - 1].texto}
        </Text>
        <Text style={styles.textBox}>
          <Text style={styles.textDest}>Horário: </Text>
          {item.dataHoraConsulta.slice(11)}
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
        data={consultas}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString() ?? randomId()}
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
