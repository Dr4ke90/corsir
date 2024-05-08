const { MongoClient } = require("mongodb");
require('dotenv').config()

const client = new MongoClient(process.env.DB_URI);

let dbConnection;

async function connectDB() {
  if (!dbConnection) {
    try {
      await client.connect(); 
      console.log('Conectat la baza de date ' + process.env.DB_NAME);
      dbConnection = client.db(process.env.DB_NAME);
    } catch (error) {
      console.error('Eroare la conectarea la baza de date:', error);
    }
  }
  return dbConnection;
}

module.exports = connectDB;