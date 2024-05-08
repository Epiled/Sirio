import {SQLiteDatabase} from 'react-native-sqlite-storage';
import openDatabaseConnection from '../../db/conection';
import {Paciente} from '../../types/TypePaciente';
import {defaultCounts} from '../../db/defaultCounts';

console.log(defaultCounts);

const createTable = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para criar a tabela se ela não existir
      const query = `
          CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nomePaciente TEXT,
            telefone TEXT,
            email TEXT,
            senha TEXT, 
            idsConsultas TEXT
          );
        `;

      // Executando a consulta SQL
      await db.executeSql(query);
      console.log('Tabela PACIENTES criada com sucesso!');

      // Popula com dados de base
      await insertBase(defaultCounts);
      console.log('PACIENTES base inseridos com sucesso!');
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
        (nomePaciente, telefone, email, senha, idsConsultas)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
        obj.idsConsulta,
      ]);
      console.log('Inserção de PACIENTE foi um sucesso!');
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

const update = async (id: number, obj: Paciente) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para atualizar PACIENTE
      const query = `
        UPDATE pacientes SET nomePaciente=?, telefone=?, email=?, senha=?, idsConsultas=? WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.nome,
        obj.telefone,
        obj.email,
        obj.senha,
        obj.idsConsulta,
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
        (nomePaciente, telefone, email, senha, idsConsultas)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL para inserção de múltiplos pacientes
      for (const count of obj) {
        console.log('Teste');
        await db.executeSql(query, [
          count.nome,
          count.telefone,
          count.email,
          count.senha,
          count.idsConsulta,
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

export default {createTable, all, insert, update, remove, drop};
