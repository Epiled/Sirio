import React, {useCallback, useEffect} from 'react';
import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import Botao from '../components/Botao';
import {RootStackParamList} from '../types/TypeRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Texto from '../components/Texto';
import {colors} from '../styles/styles';
import Pacientes from '../service/sqlite/Pacientes';
import Doctors from '../service/sqlite/Doctors';
import Consultas from '../service/sqlite/Consultas';
import useUserTypeSet from '../state/hooks/useUserTypeSet';
import openDatabaseConnection from '../db/conection';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default ({navigation}: Props) => {
  const loadData = useCallback(async () => {
    try {
      Pacientes.createTable();
      // Doctors.createTable();
      // Consultas.createTable();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setUserType = useUserTypeSet();

  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissões de armazenamento externo concedidas');
      } else {
        console.log('Permissões de armazenamento externo não concedidas');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestExternalStoragePermission();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require('../assets/img/logo-sirio-2.png')}
      />
      <Texto text="Hospital Sírios Libanês lhe da ás" />
      <Texto styles={styles.titulo} text="Boas-Vindas!" />
      <Texto styles={styles.textAcesso} text="Selecione o tipo de acesso" />

      <View style={styles.botoes}>
        <Botao
          title="Portal do Paciente"
          onPress={() => {
            navigation.navigate('Login', {userType: 'Paciente'});
            setUserType('paciente');
          }}
        />

        <Botao
          title="Portal do Médico"
          onPress={() => {
            navigation.navigate('Login', {userType: 'Médico'});
            setUserType('medico');
          }}
        />
      </View>
      <Texto styles={styles.textNC} text="Não Possui conta? ">
        <Text
          style={styles.rotaCadastro}
          onPress={() => {
            navigation.navigate('TipoCadastro');
          }}>
          Cadastre-se
        </Text>
      </Texto>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 20,
    backgroundColor: colors.lighter,
  },
  imagem: {
    width: 100,
    height: 100,
  },
  titulo: {
    fontSize: 30,
    color: colors.primary2,
    textTransform: 'uppercase',
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  textAcesso: {
    color: colors.darker,
  },
  textNC: {
    fontWeight: '500',
  },
  rotaCadastro: {
    color: colors.primary,
  },
});
