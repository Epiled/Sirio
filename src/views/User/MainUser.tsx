import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/TypeRoutesUser';
import {colors} from '../../styles/styles';
import {opcoes} from '../../db/userCards';
import Texto from '../../components/Texto';
import openDatabaseConnection from '../../db/conection';
import Pacientes from '../../service/sqlite/Pacientes';
import useUserActive from '../../state/hooks/useUserActive';

type OpcoesItem = (typeof opcoes)[number];

type MainUserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainUser'
>;

type Props = {
  navigation: MainUserScreenNavigationProp;
};

const newPaciente = {
  nome: 'Felipe teste',
  telefone: '11 8888-8888',
  email: 'felipe.teste@hotmail.com',
  senha: '2415',
  idsConsulta: '[0, 10, 11]',
};

const updatePaciente = {
  nome: 'Ana teste',
  telefone: '11 6666',
  email: 'oi',
  senha: '2415',
  idsConsulta: '[20, 12, 5]',
};

// Array de operações a serem executadas em sequência
const operations = [
  // Pacientes.createTable(),
  // Inserir outras operações assíncronas aqui, se necessário
  // Conecta no Banco
  // Pacientes.insert(newPaciente),
  // Pacientes.update(1, updatePaciente);
];

// Executar todas as operações em paralelo e aguardar a conclusão de todas
// Promise.all(operations)
//   .then(() => {
//     // Todas as operações foram concluídas com sucesso
//     console.log('Todas as operações foram concluídas com sucesso.');

//     Pacientes.all().then(rows => {
//       // Imprima os dados no console
//       console.log('Registros selecionados:');
//       rows.forEach(obj => {
//         console.log(obj);
//       });
//     });

//     // Após a conclusão de todas as operações, agora você pode executar Pacientes.drop()
//     // return Pacientes.drop();
//   })
//   .then(() => {
//     // Pacientes.drop() foi concluído com sucesso
//     console.log('Pacientes.drop() foi concluído com sucesso.');
//   })
//   .catch(error => {
//     // Ocorreu um erro em qualquer uma das operações
//     console.error('Ocorreu um erro:', error);
//   });

export default ({navigation}: Props) => {
  const {nome} = useUserActive();

  const renderItem = ({item}: {item: OpcoesItem}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(item.route as keyof RootStackParamList)
        }>
        <Material size={60} name={item.image} color={colors.primary} />
        <Texto styles={styles.textCard} text={item.texto} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View>
          <Texto
            styles={[styles.text, styles.textWelcome]}
            text="Seja bem vindo!"
          />
          <Texto styles={styles.textName} text={nome} />
        </View>

        <Image
          style={styles.image}
          source={require('../../assets/img/logo-sirio-2.png')}
        />
      </View>

      <View>
        <FlatList
          data={opcoes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2} // Define 2 colunas
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <Texto styles={styles.text} text="Como podemos ajuda-lo?" />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lighter,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,

    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
    textAlign: 'left',
  },
  textWelcome: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 0,
  },
  textCard: {
    color: colors.text,
    fontSize: 16,
    flexShrink: 1,
  },
  textName: {
    textAlign: 'left',
  },
  image: {
    width: 100,
    height: 100,
  },
  card: {
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
  contentContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
