"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMysql, BillItem }) {
      // define association here
      Bill.belongsTo(UserMysql, {
        foreignKey: "id_user",
        as: "id_userOfBillModel",
      });

      Bill.hasMany(BillItem, {
        foreignKey: "id",
        as: "IdOfBillModel",
      });
    }
  }
  Bill.init(
    {
      id_user: DataTypes.NUMBER,
      total: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
