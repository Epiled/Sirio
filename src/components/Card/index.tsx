import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/styles';
import {Consulta} from '../../types/TypeConsulta';
import {services} from '../../db/services';
import IService from '../../interface/IService';

export default ({item}: {item: Consulta}) => {
  const service: IService | undefined = services.find(
    i => i.id === item.idService,
  );

  return (
    <>
      <View style={styles.imageBox}>
        {service?.image && (
          <Image style={styles.imageCard} source={service.image} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.textCard}>{service?.texto}</Text>
        <Text style={styles.textData}>
          Data: {item.dataHoraConsulta?.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.time}>
        <Material size={25} name="clock" color={colors.primary} />
        <Text style={styles.textTime}>
          {item.dataHoraConsulta?.slice(11, 16)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    padding: 5,
    backgroundColor: colors.lighter,
    borderRadius: 5,
    maxWidth: 50,
    maxHeight: 50,
    alignSelf: 'center',
  },
  imageCard: {
    width: 40,
    height: 40,
  },
  info: {
    alignItems: 'flex-start',
    maxWidth: '65%',
  },
  textCard: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    flexShrink: 1,
  },
  textData: {
    fontWeight: '500',
    fontSize: 17.5,
    color: colors.darker,
  },
  time: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTime: {
    fontWeight: '700',
    fontSize: 17.5,
    color: colors.darker,
  },
});
