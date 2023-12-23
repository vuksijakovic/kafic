// models/pice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config.js'); // Prilagodite putanju prema vašem projektu

const Pice = sequelize.define('Pice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  naziv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cijena: {
    type: DataTypes.DECIMAL(10, 2), // DECIMAL sa dvije decimalne tačke
    allowNull: false,
  },
});

module.exports = Pice;
