"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserMysqls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      passWord: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      numberPhone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM, // Sử dụng ENUM để chỉ cho phép giá trị là 'admin' hoặc 'customer'
        values: ["admin", "customer"],
        allowNull: false, // Không cho phép giá trị null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        defaultValue: null, // Hoặc một giá trị mặc định khác phù hợp với yêu cầu của bạn
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserMysqls");
  },
};
