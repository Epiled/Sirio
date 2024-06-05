import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Texto from '../../components/Texto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import useUserTypeSet from '../../state/hooks/useUserTypeSet';

export default () => {
  const navigation = useNavigation();
  const setUserType = useUserTypeSet();

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('Cadastro', {userType: 'Médico'});
            setUserType('medico');
          }}>
          <FontAwesome5 size={60} name={'user-md'} color={colors.primary} />
          <Texto styles={styles.textCard} text={'Sou médico'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('Cadastro', {userType: 'Paciente'});
            setUserType('paciente');
          }}>
          <FontAwesome5
            size={60}
            name={'user-injured'}
            color={colors.primary}
          />
          <Texto styles={styles.textCard} text={'Sou paciente'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    aspectRatio: 1 / 1,
    borderRadius: 5,
    backgroundColor: colors.cardBG,
    padding: 20,
    paddingHorizontal: 10,
    width: '47.5%',
    marginBottom: 16, // Adiciona espaçamento entre as linhas
    marginRight: '2.5%', // Adiciona espaçamento entre as colunas
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  textCard: {
    color: colors.text,
    fontSize: 16,
    flexShrink: 1,
  },
});
