const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use the JAWSDB_URL environment variable if available (production environment)
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Use the local MySQL configuration (development environment)
  sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // Database username
    process.env.DB_PASSWORD,  // Database password
    {
      host: 'localhost',      // Database host
      dialect: 'mysql',       // Database dialect (MySQL in this case)
      port: 3301              // Database port (default MySQL port)
    }
  );
}

module.exports = sequelize;
