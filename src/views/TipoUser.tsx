import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { PermissionsAndroid } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

// Habilitando o uso de promessas no SQLite
SQLite.enablePromise(true);

const App = () => {
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissões de armazenamento externo concedidas');
      } else {
        console.log('Permissões de armazenamento externo não concedidas');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    requestExternalStoragePermission();
  }, []);


  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Função para abrir a conexão com o banco de dados e criar a tabela
    const openDatabaseConnection = async () => {
      try {
        // Abrindo o banco de dados
        const db = await SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
        console.log('Banco de dados aberto com sucesso');

        // Verificar se a tabela 'usuarios' existe
        const checkTableQuery = `
          SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios';
        `;
        const [results] = await db.executeSql(checkTableQuery);
        const tableExists = results.rows.length > 0;

        if (!tableExists) {
          // SQL para criar a tabela 'usuarios'
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS usuarios (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome TEXT,
              telefone TEXT
            );
          `;
          await db.executeSql(createTableQuery);
          console.log('Tabela "usuarios" criada com sucesso');
        }
      } catch (error) {
        console.error('Erro ao abrir o banco de dados:', error);
      }
    };

    // Chamando a função para abrir a conexão com o banco de dados e criar a tabela
    openDatabaseConnection();
  }, []);

  // Função para inserir um novo usuário no banco de dados
  const adicionarUsuario = async () => {
    try {
      // Abrir a conexão com o banco de dados
      const db = await SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

      // Executar a consulta SQL para inserir o usuário
      await db.executeSql(
        'INSERT INTO usuarios (nome, telefone) VALUES (?, ?)',
        [nome, telefone]
      );

      console.log('Usuário inserido com sucesso');

      // Atualizar a lista de usuários
      listarUsuarios();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  // Função para listar todos os usuários
  const listarUsuarios = async () => {
    try {
      // Abrir a conexão com o banco de dados
      const db = await SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

      // Executar a consulta SQL para listar os usuários
      const [results] = await db.executeSql('SELECT * FROM usuarios');
      const usuariosFromDB = results.rows.raw();

      // Atualizar o estado com os usuários do banco de dados
      setUsuarios(usuariosFromDB);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <Button title="Adicionar Usuário" onPress={adicionarUsuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;
