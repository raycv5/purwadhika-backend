const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123123",
  database: "JCWD0208",
});

module.exports = db;
