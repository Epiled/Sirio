import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/styles';
import IScheduled from '../../interface/IScheduled';
import Botao from '../../components/Botao';
import useScheduledList from '../../state/hooks/useScheduledList';
import useRemoveScheduled from '../../state/hooks/useRemoveSchedulet';
import Texto from '../../components/Texto';
import Card from '../../components/Card';
import MenssagemAviso from '../../components/MenssagemAviso';

export default () => {
  const userScheduledList = useScheduledList();
  const cancelScheduled = useRemoveScheduled();

  const [selected, setSelected] = useState<IScheduled | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const renderItem = ({item}: {item: IScheduled}) => {
    if (item.status === 'a') {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setShowOptions(true);
            setSelected(item);
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
      {userScheduledList.length > 0 ? (
        <FlatList
          data={userScheduledList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <Texto
              styles={styles.titulo}
              text="Aqui você encontrara a data e hora de suas futuras consultas domicilar"
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
              console.warn(selected);
            }}
          />
          <Botao
            style={[styles.button, styles.buttonCancel]}
            title="Cancelar consulta"
            onPress={() => {
              if (selected && selected.id) {
                const modifyScheduled = {
                  ...selected,
                  status: 'x' as 'a' | 'c' | 'x',
                };
                cancelScheduled(modifyScheduled);
              }
              setSelected(null);
              setShowOptions(false);
            }}
          />
        </View>
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
    paddingStart: 10,
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
