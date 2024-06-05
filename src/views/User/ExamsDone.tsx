import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/styles';
import Texto from '../../components/Texto';
import Card from '../../components/Card';
import MenssagemAviso from '../../components/MenssagemAviso';
import Consultas from '../../service/sqlite/Consultas';
import useUserActive from '../../state/hooks/useUserActive';
import {Consulta} from '../../types/TypeConsulta';
import orderDate from '../../../util/orderDate';

export default () => {
  const {id} = useUserActive();

  const [userScheduledList, userScheduledListSet] = useState<Consulta[]>([]);

  useEffect(() => {
    Consultas.findById(id ?? 0)
      .then(scheduledList => {
        return userScheduledListSet(orderDate(scheduledList));
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, [id]);

  const renderItem = ({item}: {item: Consulta}) => {
    const selectStyle =
      item.statusConsulta === 'a'
        ? styles.status__scheduled
        : item.statusConsulta === 'c'
        ? styles.status__done
        : styles.status__canceled;

    return (
      <View style={[styles.card, selectStyle]}>
        <View style={styles.status}>
          {item.statusConsulta === 'a' && (
            <View style={styles.status}>
              <Material
                name={'calendar-clock'}
                size={30}
                color={colors.scheduled}
              />
              <Texto text="Agendada" styles={styles.textStatus} />
            </View>
          )}
          {item.statusConsulta === 'c' && (
            <View style={styles.status}>
              <Material name={'check-circle'} size={30} color={colors.done} />
              <Texto text="Concluida" styles={styles.textStatus} />
            </View>
          )}
          {item.statusConsulta === 'x' && (
            <View style={styles.status}>
              <Material
                name={'close-circle'}
                size={30}
                color={colors.canceled}
              />
              <Texto text="Cancelada" styles={styles.textStatus} />
            </View>
          )}
        </View>
        <View style={styles.conteudo}>
          <Card item={item} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userScheduledList && userScheduledList.length > 0 ? (
        <FlatList
          data={userScheduledList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <Texto styles={styles.titulo} text="Histórico de Agendamentos" />
          }
        />
      ) : (
        <MenssagemAviso
          icone={'note-search'}
          text={'Nenhum agendamento foi encontrado no seu histórico!'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAlt: {
    justifyContent: 'center',
    flex: 1,
  },
  titulo: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  status__scheduled: {
    backgroundColor: colors.scheduledLight,
  },
  status__canceled: {
    backgroundColor: colors.canceledLight,
  },
  status__done: {
    backgroundColor: colors.doneLight,
  },
  conteudo: {
    flexDirection: 'row',
    gap: 10,
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
  cardAlt: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '80%',
    aspectRatio: 1 / 1,
  },
  textStatus: {
    fontSize: 15,
    alignItems: 'center',
  },
});
