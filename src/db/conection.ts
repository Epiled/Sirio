import SQLite from 'react-native-sqlite-storage';

// Habilitando o uso de promessas
SQLite.enablePromise(true);

// Função para abrir o banco de dados
const openDatabaseConnection = async () => {
  try {
    // Abrindo o banco de dados
    const db = await SQLite.openDatabase({
      name: 'medicineDB.db',
      location: 'default',
      foreignKeys: true,
    });

    // Feedback de sucesso
    console.log('Banco de dados aberto com sucesso');
    return db;
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
    throw error;
  }
};

export default openDatabaseConnection;
