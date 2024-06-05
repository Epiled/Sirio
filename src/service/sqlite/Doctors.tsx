import {SQLiteDatabase} from 'react-native-sqlite-storage';
import openDatabaseConnection from '../../db/conection';
import {Doctor} from '../../types/TypeDoctor';
import {defaultCounts} from '../../db/defaultDoctor';
import Reactron from 'reactotron-react-native';

// console.log(defaultCounts);

const createTable = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // Verificar se a tabela doctor já existe
      const checkTableQuery = `
        SELECT name FROM sqlite_master WHERE type='table' AND name='medicos';
      `;
      const [results] = await db.executeSql(checkTableQuery);
      const tableExists = results.rows.length > 0;

      if (!tableExists) {
        // SQL para criar a tabela se ela não existir
        const query = `
          CREATE TABLE IF NOT EXISTS medicos (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            telefone TEXT,
            email TEXT,
            senha TEXT, 
            especializacao INTEGER
          );
        `;

        // Executando a consulta SQL
        await db.executeSql(query);
        console.log('Tabela MÉDICOS criada com sucesso!');

        // Popula com dados de base
        await insertBase(defaultCounts);
        console.log('MÉDICOS base inseridos com sucesso!');
      } else {
        console.log(
          'Tabela MÉDICOS já existe. Não é necessário criar ou popular com dados.',
        );
      }
    } else {
      console.error(
        'Médicos - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao criar tabela MÉDICOS: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const all = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para selecionar todos os MÉDICOS
      const query = `
        SELECT *
        FROM medicos;
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os MÉDICOS buscados com sucesso:');

      // Verifica no log os MÉDICOS
      // rows.forEach(obj => {
      //   console.log(obj);
      // });

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Médicos: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os MÉDICOS:', error);
    return [];
  }
};

const insert = async (obj: Doctor) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo MÉDICO
      const query = `
        INSERT INTO medicos
        (nome, telefone, email, senha, especializacao)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
        obj.especializacao,
      ]);
      console.log('Inserção de MÉDICO foi um sucesso!');
    } else {
      console.error(
        'Médicos: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir MÉDICO: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const update = async (id: number, obj: Doctor) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para atualizar MÉDICO
      const query = `
        UPDATE medicos SET nome=?, telefone=?, email=?, senha=?, especializacao=? WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
        obj.especializacao,
        id, // Aqui você insere o id do médico a ser atualizado
      ]);
      console.log('Atualização de MÉDICO foi um sucesso!');
    } else {
      const errorMessage =
        'Médicos: Atualização - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao atualizar MÉDICO: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const remove = async (id: number) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para remover MÉDICO
      const query = `
        DELETE FROM medicos WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [id]);
      console.log('Remoção de MÉDICO foi um sucesso!');
    } else {
      const errorMessage =
        'Médicos: Remoção - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover MÉDICO: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const drop = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para remover tabela MÉDICOS
      const query = `
        DROP TABLE IF EXISTS medicos;`;

      // Executando a instrução SQL
      await db.executeSql(query);
      console.log('Tabela MÉDICOS deletada com sucesso');
    } else {
      const errorMessage =
        'Médicos: Drop Table - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover MÉDICO: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const insertBase = async (obj: Doctor[]) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo MÉDICO
      const query = `
        INSERT INTO medicos
        (nome, telefone, email, senha, especializacao)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL para inserção de múltiplos médicos
      for (const count of obj) {
        console.log('Teste');
        await db.executeSql(query, [
          count.nome,
          count.telefone,
          count.email,
          count.senha,
          count.especializacao,
        ]);
      }

      console.log('Inserção de MÉDICOS foi um sucesso!');
    } else {
      console.error(
        'Médicos: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir MÉDICO: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

export default {createTable, all, insert, update, remove, drop};
