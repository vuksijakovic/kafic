
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config.js'); 

const Sto = sequelize.define('Sto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Sto;
