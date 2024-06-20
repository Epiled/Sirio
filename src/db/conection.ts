import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Habilitando o uso de promessas
SQLite.enablePromise(true);

// Nome do banco de dados
const databaseName = 'medicineDB.db';

// Função para abrir o banco de dados
const openDatabaseConnection = async (): Promise<SQLiteDatabase> => {
  try {
    // Abrindo o banco de dados
    const db = await SQLite.openDatabase({
      name: databaseName,
      location: 'default',
    });

    // Feedback de sucesso
    console.log('Banco de dados aberto com sucesso', db);
    return db;
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
    throw error;
  }
};

export default openDatabaseConnection;
