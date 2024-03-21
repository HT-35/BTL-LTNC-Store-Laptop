"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill }) {
      // define association here
      BillItem.belongsTo(Bill, {
        foreignKey: "id_Bill",
        as: "itemBill",
      });
    }
  }
  BillItem.init(
    {
      id_Bill: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_Product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quanlity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BillItem",
    }
  );
  return BillItem;
};
