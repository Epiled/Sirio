import {SQLiteDatabase} from 'react-native-sqlite-storage';
import openDatabaseConnection from '../../db/conection';
import {Consulta} from '../../types/TypeConsulta';
import {defaultSchedulings} from '../../db/defaultSchedulings';
import Reactotron from 'reactotron-react-native';

// console.log(defaultCounts);

const createTable = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // Verificar se a tabela consultas já existe
      const checkTableQuery = `
        SELECT name FROM sqlite_master WHERE type='table' AND name='consultas';
      `;
      const [results] = await db.executeSql(checkTableQuery);
      const tableExists = results.rows.length > 0;

      if (!tableExists) {
        // SQL para criar a tabela se ela não existir
        const query = `
          CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            idPaciente INTEGER,
            idDoctor INTEGER,
            idService INTEGER,
            statusConsulta TEXT,
            dataHoraConsulta TEXT
          );
        `;

        // Executando a consulta SQL
        await db.executeSql(query);
        console.log('Tabela CONSULTAS criada com sucesso!');

        // Popula com dados de base
        await insertBase(defaultSchedulings);
        console.log('CONSULTAS base inseridos com sucesso!');
      } else {
        console.log(
          'Tabela CONSULTAS já existe. Não é necessário criar ou popular com dados.',
        );
      }
    } else {
      console.error(
        'Consultas - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao criar tabela CONSULTAS: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const all = async () => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para selecionar todos os CONSULTAS
      const query = `
        SELECT *
        FROM consultas;
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os CONSULTAS buscados com sucesso:');

      // Verifica no log os CONSULTAS
      // rows.forEach(obj => {
      //   console.log(obj);
      // });

      Reactotron.log(rows);

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Consultas: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os CONSULTAS:', error);
    return [];
  }
};

const insert = async (obj: Consulta) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo PACIENTE
      const query = `
        INSERT INTO consultas
        (idPaciente, idDoctor, idService, statusConsulta, dataHoraConsulta)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.idPaciente,
        obj.idDoctor,
        obj.idService,
        obj.statusConsulta,
        obj.dataHoraConsulta,
      ]);
      console.log('Inserção de CONSULTA foi um sucesso!');
    } else {
      console.error(
        'Consultas: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir CONSULTA: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const update = async (id: number, obj: Consulta) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para atualizar CONSULTA
      const query = `
        UPDATE consultas SET idPaciente=?, idDoctor=?, idService=?, statusConsulta=?, dataHoraConsulta=? WHERE id=?;`;

      Reactotron.log('Banco', obj);

      // Executando a instrução SQL
      await db.executeSql(query, [
        obj.idPaciente,
        obj.idDoctor,
        obj.idService,
        obj.statusConsulta,
        obj.dataHoraConsulta,
        id, // Aqui você insere o id do paciente a ser atualizado
      ]);
      console.log('Atualização de CONSULTA foi um sucesso!');
    } else {
      const errorMessage =
        'Consultas: Atualização - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao atualizar CONSULTA: ', error);
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
        DELETE FROM consultas WHERE id=?;`;

      // Executando a instrução SQL
      await db.executeSql(query, [id]);
      console.log('Remoção de CONSULTA foi um sucesso!');
    } else {
      const errorMessage =
        'Consultas: Remoção - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover CONSULTA: ', error);
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
        DROP TABLE IF EXISTS consultas;`;

      // Executando a instrução SQL
      await db.executeSql(query);
      console.log('Tabela CONSULTAS deletada com sucesso');
    } else {
      const errorMessage =
        'Consultas: Drop Table - Não foi possível abrir a conexão com o banco de dados!';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Erro ao remover CONSULTA: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const insertBase = async (obj: Consulta[]) => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para inserir novo CONSULTA
      const query = `
        INSERT INTO consultas
        (idPaciente, idDoctor, idService, statusConsulta, dataHoraConsulta)
        VALUES(?, ?, ?, ?, ?);`;

      // Executando a instrução SQL para inserção de múltiplos consultas
      for (const count of obj) {
        await db.executeSql(query, [
          count.idPaciente,
          count.idDoctor,
          count.idService,
          count.statusConsulta,
          count.dataHoraConsulta,
        ]);
      }

      console.log('Inserção de CONSULTAS foi um sucesso!');
    } else {
      console.error(
        'Consultas: Inserção - Não foi possível abrir a conexão com o banco de dados!',
      );
    }
  } catch (error) {
    console.error('Erro ao inserir CONSULTA: ', error);
    throw error; // Lança o erro para que seja tratado pela função chamadora
  }
};

const findById = async (idPaciente: number): Promise<Consulta[]> => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      // SQL para selecionar todos os CONSULTAS
      const query = `
        SELECT *
        FROM consultas WHERE idPaciente=?;
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query, [idPaciente]);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os CONSULTAS buscados com sucesso:');

      // Verifica no log os CONSULTAS
      // rows.forEach(obj => {
      //   console.log(obj);
      // });

      Reactotron.log(rows);

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Consultas: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os CONSULTAS:', error);
    return [];
  }
};

const findPacintes = async (idDoctor: number): Promise<Consulta[]> => {
  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();

    if (db) {
      const query = `
        SELECT * FROM Pacientes WHERE id IN (SELECT idPaciente FROM Consultas WHERE idDoctor=?);
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query, [idDoctor]);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os CONSULTAS buscados com sucesso:');

      // Verifica no log os CONSULTAS
      // rows.forEach(obj => {
      //   console.log(obj);
      // });

      Reactotron.log(rows);

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Consultas: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os CONSULTAS:', error);
    return [];
  }
};

const todayList = async (idDoctor: number): Promise<Consulta[]> => {
  Reactotron.log("Olá Mundo");

  try {
    // Abrir a conexão com o banco de dados
    const db: SQLiteDatabase | undefined = await openDatabaseConnection();
    console.log("Teste 3");

    if (db) {
      const query = `
        SELECT * FROM Consultas WHERE substr(dataHoraConsulta, 1, 10) = strftime('%d/%m/%Y', 'now');
      `;

      // Executando a consulta SQL e obter os resultados
      const [results] = await db.executeSql(query);

      // Converter os resultados para um array de objetos
      const rows: any[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        rows.push(results.rows.item(i));
      }

      console.log('Todos os CONSULTAS buscados com sucesso:');

      // Retornar os dados encontrados
      return rows;
    } else {
      console.error(
        'Consultas: Selecionar Todos - Não foi possível abrir a conexão com o banco de dados!',
      );
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar todos os CONSULTAS:', error);
    return [];
  }
};

export default {
  createTable,
  all,
  insert,
  update,
  remove,
  drop,
  findPacintes,
  findById,
  todayList,
};
