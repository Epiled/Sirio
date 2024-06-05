import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CampoDigitacao from '../../components/CampoDigitacao';
import Texto from '../../components/Texto';
import Botao from '../../components/Botao';
import Pacientes from '../../service/sqlite/Pacientes';
import Doctors from '../../service/sqlite/Doctors';
import {Paciente} from '../../types/TypePaciente';
import {Doctor} from '../../types/TypeDoctor';
import useUserType from '../../state/hooks/useUserType';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../styles/styles';
import {services} from '../../db/services';
import Reactotron from 'reactotron-react-native';

export default () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especializacao, setEspecializacao] = useState('');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([...services]);
  const [value, setValue] = useState(null);
  const [hasErrors, setHasErrors] = useState(false);

  const [error, setError] = useState<{
    [key: string]: {error: boolean; menssage: string};
  }>({
    nome: {
      error: false,
      menssage: 'Campo nome não pode estar vazio',
    },
    senha: {
      error: false,
      menssage: 'Campo senha não pode estar vazio',
    },
    email: {
      error: false,
      menssage: 'Campo email não pode estar vazio',
    },
    telefone: {
      error: false,
      menssage: 'Campo telefone não pode estar vazio',
    },
    especializacao: {
      error: false,
      menssage: 'Campo especialização não pode estar vazio',
    },
  });

  const userType = useUserType();

  const checkInputs = (obj: Paciente | Doctor) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const updatedError = {...error};

    keys.forEach((key: string, i: number) => {
      const str = values[i].toString();
      const regex = /\s+/g;
      // Remove todos os espaços em branco da string
      const strSemEspacos = str.replace(regex, '');

      // Verifica se a string resultante está vazia
      if (strSemEspacos === '') {
        updatedError[key].error = true;
        console.log('A string está vazia após remover os espaços em branco.');
      } else {
        updatedError[key].error = false;
        console.log(
          'A string não está vazia após remover os espaços em branco.',
        );
      }
    });

    setError(updatedError);
  };

  const cadastrar = (typeAccount: string | null) => {
    const obj = buildObj(typeAccount);
    if (typeAccount === 'medico') {
      Doctors.insert(obj as Doctor);
    } else {
      Pacientes.insert(obj);
    }
  };

  const buildObj = (typeAccount: string | null) => {
    let dados: Paciente | Doctor = {
      nome: nome,
      senha: senha,
      email: email,
      telefone: telefone,
    };
    if (typeAccount === 'medico') {
      dados = {
        ...dados,
        especializacao: especializacao,
      };
    }
    return dados;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <Texto styles={styles.text} text="Nome Completo:*" />
          <CampoDigitacao
            placeholder="Exemplo: Felipe Silva"
            onChangeText={(text: React.SetStateAction<string>) => setNome(text)}
          />
          {error.nome.error && (
            <Texto styles={styles.textErro} text={error.nome.menssage} />
          )}
        </View>
        <View style={styles.containerInput}>
          <Texto styles={styles.text} text="Senha:*" />
          <CampoDigitacao
            placeholder="********"
            onChangeText={(text: React.SetStateAction<string>) =>
              setSenha(text)
            }
          />
          {error.senha.error && (
            <Texto styles={styles.textErro} text={error.senha.menssage} />
          )}
        </View>
        <View style={styles.containerInput}>
          <Texto styles={styles.text} text="E-mail:*" />
          <CampoDigitacao
            placeholder="Exemplo: exemplo@gmail.com"
            onChangeText={(text: React.SetStateAction<string>) =>
              setEmail(text)
            }
          />
          {error.email.error && (
            <Texto styles={styles.textErro} text={error.email.menssage} />
          )}
        </View>
        <View style={styles.containerInput}>
          <Texto styles={styles.text} text="Número de Celular:*" />
          <CampoDigitacao
            placeholder="(11) 9 0000-0000"
            onChangeText={(text: React.SetStateAction<string>) =>
              setTelefone(text)
            }
          />
          {error.telefone.error && (
            <Texto styles={styles.textErro} text={error.telefone.menssage} />
          )}
        </View>

        {userType && userType === 'medico' && (
          <View style={styles.containerInput}>
            <Texto styles={styles.text} text="Especialização:*" />
            <DropDownPicker
              placeholder="Selecione sua especialiação"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.borda}
              onChangeValue={(e: string | null) => setEspecializacao(e ?? '')}
            />
            {error.especializacao.error && (
              <Texto
                styles={styles.textErro}
                text={error.especializacao.menssage}
              />
            )}
          </View>
        )}

        <Botao
          title="Finalizar Cadastro"
          onPress={() => {
            const obj = buildObj(userType);
            checkInputs(obj);
            const newHasErrors = Object.values(error).some(e => e.error);

            if (!newHasErrors) {
              cadastrar(userType);
              return;
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  containerInput: {
    gap: 10,
    marginBottom: 20,
  },
  text: {
    textAlign: 'left',
  },
  textErro: {
    textAlign: 'left',
    fontSize: 14,
    color: colors.error,
  },
  borda: {
    borderColor: colors.borda,
    shadowColor: colors.darker,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
