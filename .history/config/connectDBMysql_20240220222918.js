const Sequelize = require("Sequelize");

const sequelize = new Sequelize("StoreDB", "root", "secret", {
  host: "127.0.0.1",
  port: "3308",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
model.export = {
  sequelize,
};
