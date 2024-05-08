import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles/styles';
import IScheduled from '../../interface/IScheduled';

export default ({item}: {item: IScheduled}) => {
  return (
    <>
      <View style={styles.imageBox}>
        <Image style={styles.imageCard} source={item.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.textCard}>{item.texto}</Text>
        <Text style={styles.textData}>Data: {item.date.slice(0, 10)}</Text>
      </View>
      <View style={styles.time}>
        <Material size={25} name="clock" color={colors.primary} />
        <Text style={styles.textTime}>{item.date.slice(11, 16)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    padding: 5,
    backgroundColor: colors.lighter,
    borderRadius: 5,
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
