"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMysql }) {
      // define association here
    }
  }
  CartUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allowNull: false,
    },
    {
      sequelize,
      modelName: "CartUser",
    }
  );
  return CartUser;
};
