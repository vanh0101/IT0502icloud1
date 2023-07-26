const { MongoClient } = require('mongodb');

//const mongoURI = 'mongodb://127.0.0.1:27017';
const mongoURI = 'mongodb+srv://binhdq222:123456abc@cluster0.lkrga.mongodb.net';
const dbName = 'IT0502';

let db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectToDatabase, getDatabase };
