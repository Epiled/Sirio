import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Botao from '../components/Botao';
import Divisor from '../components/Divisor';
import CampoDigitacao from '../components/CampoDigitacao';
import {colors} from '../styles/styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/TypeRoutesUser';
import Texto from '../components/Texto';
import GoogleLogo from '../assets/img/social/google.svg.png';
import FacebookLogo from '../assets/img/social/facebook.png';
import DropDownPicker from 'react-native-dropdown-picker';
import useUserType from '../state/hooks/useUserType';
import useUserTypeSet from '../state/hooks/useUserTypeSet';
import Pacientes from '../service/sqlite/Pacientes';
import Reactron from 'reactotron-react-native';
import {Paciente} from '../types/TypePaciente';
import useUserActiveSet from '../state/hooks/useUserActiveSet';

type MainUserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainUser'
>;

type Props = {
  navigation: MainUserScreenNavigationProp;
};

export default ({navigation}: Props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Telefone', value: 'telefone'},
    {label: 'E-mail', value: 'email'},
  ]);
  const [value, setValue] = useState(items[0].value);
  const userType = useUserType();
  const setUserType = useUserTypeSet();

  const setUserActive = useUserActiveSet();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Texto styles={styles.titulo} text="Selecione um tipo de Login!" />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.borda}
        />
      </View>

      <View style={styles.box}>
        {value === 'telefone' && (
          <>
            <Texto
              styles={[styles.titulo, styles.tituloAlt]}
              text="Login por número de telefone"
            />
            <CampoDigitacao placeholder={'(xx) x xxxx-xxxx'} />
          </>
        )}

        {value === 'email' && (
          <>
            <Texto
              styles={[styles.titulo, styles.tituloAlt]}
              text="Login por endereço de e-mail"
            />
            <CampoDigitacao
              placeholder={'Endereço de E-mail'}
              onChangeText={(text: React.SetStateAction<string>) =>
                setEmail(text)
              }
            />
            <CampoDigitacao
              placeholder={'Senha: ******'}
              onChangeText={(text: React.SetStateAction<string>) =>
                setSenha(text)
              }
            />
          </>
        )}
      </View>

      {userType && userType === 'paciente' ? (
        <Botao
          title="Continuar"
          onPress={() => {
            setUserType('paciente');
            Pacientes.checkAccount(email, senha).then(result => {
              if (result !== undefined) {
                const obj: Paciente = result;
                setUserActive(obj);
                navigation.navigate('MainUser');
              }
            });
          }}
        />
      ) : (
        <Botao
          title="Continuar"
          onPress={() => {
            navigation.navigate('MainDoctor');
            setUserType('medico');
          }}
        />
      )}

      <Divisor />

      <View style={styles.box}>
        <Botao
          title="Continuar com Google"
          backgroundColor={colors.lighter}
          textColor={colors.text}
          icon={GoogleLogo}
          shadow
        />
        <Botao
          title="Continuar com Facebook"
          backgroundColor={colors.facebook}
          textColor={colors.lighter}
          icon={FacebookLogo}
          shadow
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 10,
    backgroundColor: colors.lighter,
    paddingTop: 30,
  },
  box: {
    gap: 10,
  },
  titulo: {
    color: colors.darker,
    marginBottom: 5,
    textAlign: 'left',
  },
  tituloAlt: {
    color: colors.text,
    fontSize: 15,
  },
  borda: {
    borderColor: colors.borda,
  },
});
