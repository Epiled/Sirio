import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/styles';
import Botao from '../../components/Botao';
import useScheduledList from '../../state/hooks/useScheduledList';
import useRemoveScheduled from '../../state/hooks/useRemoveSchedulet';
import Texto from '../../components/Texto';
import Card from '../../components/Card';
import MenssagemAviso from '../../components/MenssagemAviso';
import Consultas from '../../service/sqlite/Consultas';
import useUserActive from '../../state/hooks/useUserActive';
import Reactotron from 'reactotron-react-native';
import { Consulta } from '../../types/TypeConsulta';
import useScheduledListSet from '../../state/hooks/useScheduledListSet';
import orderDate from '../../../util/orderDate';
import useAddCurrent from '../../state/hooks/useAddCurrent';
import DatePicker from '../../components/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização para o português do Brasi
import handleDate from '../../../util/handleDate';
import useServiceCurrentSet from '../../state/hooks/useServiceCurrentSet';
import useServiceCurrent from '../../state/hooks/useServiceCurrent';
import randomId from '../../../util/randomId';
dayjs.locale('pt-br'); // Defina o idioma padrão para o português do Brasil

export default () => {
  const userScheduledList = useScheduledList();
  const setScheduledList = useScheduledListSet();

  const {id} = useUserActive();

  const cancelScheduled = useRemoveScheduled();

  const [selected, setSelected] = useState<Consulta | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (id) {
      Consultas.findById(id)
        .then(scheduledList => {
          Reactotron.log(scheduledList);
          return setScheduledList(orderDate(scheduledList, 'ASC'));
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
        });
    }
  }, [id]);

  const checkList = () => {
    if (userScheduledList.length > 0) {
      return userScheduledList.some(
        scheduling => scheduling.statusConsulta === 'a',
      );
    } else {
      return false;
    }
  };

  const setUserScheduledCurrent = useAddCurrent();

  const [showDatePicker, setShowDatePicker] = useState(false);

  // const setUserServiceCurrent = useServiceCurrentSet();

  const renderItem = ({item}: {item: Consulta}) => {
    if (item.statusConsulta === 'a') {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setShowOptions(true);
            setSelected(item);
            setUserScheduledCurrent(item);
          }}>
          <Card item={item} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {checkList() ? (
        <FlatList
          data={userScheduledList}
          renderItem={renderItem}
          keyExtractor={item => (item.id ? item.id.toString() : '')}
          ListHeaderComponent={
            <Texto
              styles={styles.titulo}
              text="Aqui você encontrara a data e hora de suas futuras consultas domiciliar"
            />
          }
        />
      ) : (
        <MenssagemAviso
          icone={'note-search'}
          text={'Nenhuma consulta agendada'}
        />
      )}

      {showOptions && (
        <View style={styles.buttons}>
          <Botao
            style={styles.buttonClose}
            title="X"
            onPress={() => setShowOptions(false)}
          />
          <Botao
            style={styles.button}
            title="Editar consulta"
            onPress={() => {
              setShowDatePicker(true);
            }}
          />
          <Botao
            style={[styles.button, styles.buttonCancel]}
            title="Cancelar consulta"
            onPress={() => {
              if (selected && selected.id) {
                const modifyScheduled = {
                  ...selected,
                  statusConsulta: 'x' as 'a' | 'c' | 'x',
                };
                cancelScheduled(modifyScheduled);
                Consultas.update(selected.id, modifyScheduled);
              }
              setSelected(null);
              setShowOptions(false);
            }}
          />
        </View>
      )}
      {/* <Botao
        title="Lista no Recoil"
        onPress={() => {
          console.log(userScheduledList);
        }}
      />
      <Botao
        title="Drop Consultas"
        onPress={() => {
          Consultas.drop();
        }}
      />
      <Botao
        title="Create Cosultas"
        onPress={() => {
          Consultas.createTable();
        }}
      /> */}
      <DatePicker
        showPicker={showDatePicker}
        onClose={setShowDatePicker}
        onUpdate
        onPress={() => {
          setSelected(null);
          setShowOptions(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAlt: {
    justifyContent: 'center',
  },
  titulo: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
    textAlign: 'left',
  },
  card: {
    borderRadius: 5,
    backgroundColor: colors.lighter,
    padding: 20,
    paddingHorizontal: 10,
    marginBottom: 16, // Adiciona espaçamento entre as linhas
    marginRight: 20, // Adiciona espaçamento entre as colunas
    marginLeft: 20, // Adiciona espaçamento entre as colunas
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
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
  buttons: {
    borderColor: colors.primary,
    borderTopWidth: 2,
    backgroundColor: colors.lighter,
    gap: 10,
    padding: 20,
    paddingTop: 10,
  },
  button: {
    height: 'auto',
    paddingVertical: 5,
  },
  buttonCancel: {
    backgroundColor: colors.error,
  },
  buttonClose: {
    width: 30,
    height: 30,
    backgroundColor: colors.error,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
