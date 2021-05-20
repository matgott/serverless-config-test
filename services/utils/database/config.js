const {Sequelize} = require("sequelize");
const pg = require("pg");

module.exports.sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  dialect: "postgres",
  dialectModule: pg,
  omitNull: true,
  pool: {
    max: 3,
    min: 0,
    idle: 10000,
  },
});
