const Sequelize = require("Sequelize ");

const sequelize = new Sequelize("StoreDB", "root", "secret", {
  host: "127.0.0.1",

  dialect: "mysql",
});
