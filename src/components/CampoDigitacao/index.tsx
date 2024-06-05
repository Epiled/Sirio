import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../styles/styles';

interface ICampoDigitacao {
  icon?: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
}

export default ({icon, placeholder, onChangeText}: ICampoDigitacao) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText && onChangeText(text);
  };

  return (
    <View style={styles.box}>
      {icon && <Image source={{uri: icon}} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder=" " // Placeholder vazio
          onChangeText={handleChangeText}
          value={inputValue}
        />
        {!inputValue && <Text style={styles.placeholder}>{placeholder}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 10,
    width: '100%', // Define a largura como 100% da tela
    borderRadius: 5,
    backgroundColor: colors.lighter,
    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    fontSize: 15,
    color: colors.darker, // Deixando o texto transparente para não interferir com o placeholder
  },
  placeholder: {
    position: 'absolute',
    left: 12,
    top: 12,
    fontSize: 15,
    color: colors.placeholder,
  },
});
