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
import {services} from '../../db/services';
import IService from '../../interface/IService';
import useServiceCurrentSet from '../../state/hooks/useServiceCurrentSet';

export default () => {
  const setUseServiceCurrent = useServiceCurrentSet();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderItem = ({item}: {item: IService}) => {
    const {texto, price, image} = item;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setUseServiceCurrent(item);
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
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <Texto styles={styles.titulo} text="Escolha e agende seu serviço" />
          }
        />
      </View>

      <DatePicker showPicker={showDatePicker} onClose={setShowDatePicker} />
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
