const Sequelize = require("Sequelize ");

const sequelize = new Sequelize("StoreDB", "root", "secret", {
  host: "localhost",

  dialect: "mysql",
});
