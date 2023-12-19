require('dotenv').config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

module.exports = {
  jwtSecret: 'ABCD',
  database: {
    host: host,
    user: user,
    password: password,
    database: database
  }
};