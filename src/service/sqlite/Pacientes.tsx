import {SQLiteDatabase} from 'react-native-sqlite-storage';
import openDatabaseConnection from '../../db/conection';
import {Paciente} from '../../types/TypePaciente';
import {defaultCounts} from '../../db/defaultCounts';
import Reactotron from 'reactotron-react-native';

const createTable = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // Verificar se a tabela pacientes já existe
      const checkTableQuery = `
        SELECT name FROM sqlite_master WHERE type='table' AND name='pacientes';
      `;
      const [results] = await db.executeSql(checkTableQuery);
      const tableExists = results.rows.length > 0;

      if (!tableExists) {
        // SQL para criar a tabela se ela não existir
        const query = `
          CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            telefone TEXT,
            email TEXT,
            senha TEXT
          );
        `;

        // Executando a consulta SQL
        await db.executeSql(query);
        console.log('Tabela PACIENTES criada com sucesso!');

        // Popula com dados de base
        await insertBase(defaultCounts);
        console.log('PACIENTES base inseridos com sucesso!');
      } else {
        console.log(
          'Tabela PACIENTES já existe. Não é necessário criar ou popular com dados.',
        );
      }
    } else {
      console.error(
        'Pacientes - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao criar tabela PACIENTES: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const all = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para selecionar todos os PACIENTES
      const query = `
        SELECT *
        FROM pacientes;
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os PACIENTES buscados com sucesso:');

      // Verifica no log os PACIENTES
      // rows.forEach(obj => {
      //   console.log(obj);
      // });

      Reactotron.log(rows);

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Pacientes: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os PACIENTES:', error);
    return [];
  }
};

const insert = async (obj: Paciente) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo PACIENTE
      const query = `
        INSERT INTO pacientes
        (nome, telefone, email, senha)
        VALUES(?, ?, ?, ?);`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
      ]);
      console.log('Inserção de PACIENTE foi um sucesso!');
    } else {
      console.error(
        'Pacientes: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir PACIENTE: ', error);
    // throw error; // Lança o erro para que seja tratado pela função chamadora
    throw new TypeError('oops');
  }
};

const update = async (id: number, obj: Paciente) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para atualizar PACIENTE
      const query = `
        UPDATE pacientes SET nome=?, telefone=?, email=?, senha=?, WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
        id, // Aqui você insere o id do paciente a ser atualizado
      ]);
      console.log('Atualização de PACIENTE foi um sucesso!');
    } else {
      const errorMessage =
        'Pacientes: Atualização - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao atualizar PACIENTE: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const remove = async (id: number) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para remover PACIENTE
      const query = `
        DELETE FROM pacientes WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [id]);
      console.log('Remoção de PACIENTE foi um sucesso!');
    } else {
      const errorMessage =
        'Pacientes: Remoção - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover PACIENTE: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const checkAccount = async (email: string, senha: string) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para validar PACIENTE
      const query = `
        SELECT * FROM pacientes WHERE email=? AND senha=?;`;

      // Executando a instrução SQL
      const [results] = await db.executeSql(query, [email, senha]);
      console.log('Validação de PACIENTE foi um sucesso!');

      let dades = {};

      if (results.rows.length > 0) {
        const result = results.rows.item(0);
        dades = {
          id: result.id,
          nome: result.nome,
          telefone: result.telefone,
          email: result.email,
        };
        return dades;
      }

      Reactotron.log(await results.rows.item(0));
      return results.rows.item(0);
    } else {
      const errorMessage =
        'Validar Paciente - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao validar Paciente: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const drop = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para remover PACIENTE
      const query = `
        DROP TABLE IF EXISTS pacientes;`;

      // Executando a instrução SQL
      await db.executeSql(query);
      console.log('Tabela PACIENTES deletada com sucesso');
    } else {
      const errorMessage =
        'Pacientes: Drop Table - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover PACIENTE: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const insertBase = async (obj: Paciente[]) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo PACIENTE
      const query = `
        INSERT INTO pacientes
        (nome, telefone, email, senha)
        VALUES(?, ?, ?, ?);`;

      // Executando a instrução SQL para inserção de múltiplos pacientes
      for (const count of obj) {
        await db.executeSql(query, [
          count.nome,
          count.telefone,
          count.email,
          count.senha,
        ]);
      }

      console.log('Inserção de PACIENTES foi um sucesso!');
    } else {
      console.error(
        'Pacientes: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir PACIENTE: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

export default {createTable, all, insert, update, remove, checkAccount, drop};
