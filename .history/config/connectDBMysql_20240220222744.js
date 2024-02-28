const Sequelize = require("Sequelize ");
import { model } from './../node_modules/mongoose/types/index.d';

const sequelize = new Sequelize("StoreDB", "root", "secret", {
  host: "127.0.0.1",
  port: "3308",
  dialect: "mysql",
});
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
export.model = {
    
}