"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMysql, BillItem, BillAddress }) {
      // define association here
      Bill.belongsTo(UserMysql, {
        foreignKey: "id_user",
        as: "id_userOfBillModel",
      });

      Bill.belongsTo(BillAddress, {
        foreignKey: "billing_info_id",
        as: "billing_info_idOfBillModel",
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
      billing_info_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
