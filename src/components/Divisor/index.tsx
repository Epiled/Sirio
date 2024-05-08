import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../styles/styles';

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.divisorContainer}>
        <View style={styles.divisor} />
        <Text style={styles.textoNoMeio}>Ou</Text>
        <View style={styles.divisor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.lighter,
  },
  divisorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisor: {
    flex: 1,
    height: 1,
    backgroundColor: '#a0a0a0',
  },
  textoNoMeio: {
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },
});
