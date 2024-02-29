"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMysql extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserMysql.init(
    {
      fullName: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
        unique: true,
      },
      passWord: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
        unique: true,
      },
      numberPhone: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "customer"), // Sử dụng ENUM để chỉ cho phép giá trị là 'admin' hoặc 'customer'
        allowNull: false, // Không cho phép giá trị null
      },
    },
    {
      sequelize,
      modelName: "UserMysql",
      timestamps: true,
    }
  );
  return UserMysql;
};
