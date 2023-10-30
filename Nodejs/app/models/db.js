const mssql = require("mssql");
const dbConfig = require("../config/db.config.js");

var connection = mssql.createPool({
  server: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = sql.connect(connection);
