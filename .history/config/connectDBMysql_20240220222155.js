const Sequelize = require("Sequelize ");

const sequelize = new Sequelize("StoreDB", "root", "password", {
  host: "localhost",
  // one of our supported dialects:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: "postgres",
});
