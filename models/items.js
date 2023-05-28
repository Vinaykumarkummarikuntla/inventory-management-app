const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const products = sequelize.define('items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Itemname: Sequelize.STRING,
      Description: Sequelize.STRING,
      Price: Sequelize.INTEGER,
      Quantity: Sequelize.INTEGER
});

module.exports = products;