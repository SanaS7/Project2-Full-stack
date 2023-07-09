const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let mongoClient;

if (process.env.MONGODB_URI) {
  // Use the MONGODB_URI environment variable if available (production environment)
  mongoClient = new MongoClient(process.env.MONGODB_URI);
} else {
  // Use the local MongoDB configuration (development environment)
  const url = 'mongodb+srv://boybrown552:zXgo9cMzbRgxnJ4P@cluster0.zsze6ft.mongodb.net/lightCville_db=true&w=majority'; 

  const dbName = process.env.DB_NAME;      // Database name

  mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Connect to MongoDB and retrieve the database object
mongoClient.connect((err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    const db = client.db(dbName);
    module.exports = db;
    console.log('Connected to MongoDB successfully.');
  }
});
