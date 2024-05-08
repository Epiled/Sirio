import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../../styles/styles';
import DatePicker from '../../components/DatePicker';
import Texto from '../../components/Texto';
import IAgendamento from '../../interface/IScheduled';
// import useScheduledCurrent from '../../state/hooks/useScheduledCurrent';
import useAddCurrent from '../../state/hooks/useAddCurrent';

const icon = require('../../assets/img/servicos/solar.png');

const servicos = [
  {
    id: '1',
    texto: 'Curativo de lesões',
    price: '400,00',
    image: icon,
  },
  {
    id: '2',
    texto: 'Curativo de cateter',
    price: '300,00',
    image: icon,
  },
  {
    id: '3',
    texto: 'Banho',
    price: '250,00',
    image: icon,
  },
  {
    id: '4',
    texto: 'Administração de Medicamento',
    price: '1200,00',
    image: icon,
  },
  {
    id: '5',
    texto: 'Orientação sobre sondas',
    price: '200,00',
    image: icon,
  },
  {
    id: '6',
    texto: 'Administração de dieta enteral',
    price: '300,00',
    image: icon,
  },
  {
    id: '7',
    texto: 'Vacina',
    price: '300,00',
    image: icon,
  },
  {
    id: '8',
    texto: 'Passagem de sonda de alívio',
    price: '500,00',
    image: icon,
  },
  {
    id: '9',
    texto: 'Passagem de sonda vesical de demora',
    price: '1000,00',
    image: icon,
  },
  {
    id: '10',
    texto: 'Vacina',
    price: '300,00',
    image: icon,
  },
  {
    id: '11',
    texto: 'Passagem de sonda de alívio',
    price: '500,00',
    image: icon,
  },
  {
    id: '12',
    texto: 'Passagem de sonda vesical de demora',
    price: '1000,00',
    image: icon,
  },
];

export default () => {
  // const userScheduledCurrent = useScheduledCurrent();
  const setUserScheduledCurrent = useAddCurrent();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderItem = ({item}: {item: IAgendamento}) => {
    const {texto, price, image} = item;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setUserScheduledCurrent(item);
          setShowDatePicker(true);
        }}>
        <Image style={styles.imageCard} source={image} />
        <Texto styles={styles.textCard} text={texto} />
        <Texto styles={styles.textPrice} text={`R$: ${price}`} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={servicos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <Texto styles={styles.titulo} text="Escolha e agende seu serviço" />
          }
        />
      </View>

      {/* {userScheduledCurrent && showDatePicker && ( */}
      <DatePicker showPicker={showDatePicker} onClose={setShowDatePicker} />
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 30,
  },
  card: {
    borderRadius: 5,
    backgroundColor: colors.lighter,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 16, // Adiciona espaçamento entre as linhas
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageCard: {
    width: 40,
    height: 40,
  },
  textCard: {
    color: colors.text,
    fontSize: 16,
    flexShrink: 1,
    textAlign: 'left',
  },
  textPrice: {
    color: colors.darker,
    fontSize: 15,
    marginLeft: 'auto',
  },
});
