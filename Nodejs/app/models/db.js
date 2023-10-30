const mssql = require("mssql");
const dbConfig = require("../config/db.config.js");

var connection = {
  server: dbConfig.SERVER,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
};

module.exports = sql.connect(connection);
