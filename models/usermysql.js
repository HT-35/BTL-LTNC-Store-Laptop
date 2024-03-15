"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMysql extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CartUser, Bill }) {
      // define association here

      UserMysql.hasOne(CartUser, {
        foreignKey: "id",
        as: "idOfUserModelinCartModel",
      });
      UserMysql.hasMany(Bill, {
        foreignKey: "id",
        as: "idOfUserModelinBillModel",
      });
    }
  }
  UserMysql.init(
    {
      fullName: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
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
      paranoid: true, // Chỉnh sửa thành true để kích hoạt soft delete

      timestamps: true,
      modelName: "UserMysql",
    }
  );
  return UserMysql;
};
