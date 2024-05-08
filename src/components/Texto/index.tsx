import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '../../styles/styles';

interface ITexto {
  text: string;
  children?: React.ReactElement;
  styles?: TextStyle | TextStyle[];
}

export default ({text, styles, children}: ITexto) => {
  return (
    <Text style={[stylesText.text, styles]}>
      {text}
      {children && children}
    </Text>
  );
};

const stylesText = StyleSheet.create({
  text: {
    color: colors.text2,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
