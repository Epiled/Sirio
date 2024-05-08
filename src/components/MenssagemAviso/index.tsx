import React from 'react';
import {StyleSheet, View} from 'react-native';
import Texto from '../Texto';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/styles';

export default ({icone, text}: {icone: string; text: string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Material size={60} name={icone} color={colors.primary} />
        <Texto styles={styles.titulo} text={text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 10,
    marginBottom: 16, // Adiciona espaçamento entre as linhas
    marginRight: 20, // Adiciona espaçamento entre as colunas
    marginLeft: 20, // Adiciona espaçamento entre as colunas
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
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '80%',
    aspectRatio: 1 / 1,
  },
});
