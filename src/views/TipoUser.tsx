import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Botao from '../components/Botao';
import {RootStackParamList} from '../types/TypeRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Texto from '../components/Texto';
import {colors} from '../styles/styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default ({navigation}: Props) => {
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
            navigation.navigate('LoginUser');
          }}
        />

        <Botao
          title="Portal do Médico"
          onPress={() => {
            navigation.navigate('LoginDoctor');
          }}
        />
      </View>
      <Texto styles={styles.textNC} text="Não Possui conta? ">
        <Texto styles={styles.rotaCadastro} text="Cadastre-se" />
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
function setTodos(
  storedTodoItems: import('../interface/IToDoItem').ToDoItem[],
) {
  throw new Error('Function not implemented.');
}
