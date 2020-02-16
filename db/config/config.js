require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'grantchain',
    host: process.env.DBHOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'grantchain',
    host: process.env.DBHOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.HEROKU_POSTGRESQL_BROWN_URL,
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: 'postgres',
  },
};