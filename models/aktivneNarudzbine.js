// models/aktivneNarudzbine.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config.js'); // Prilagodite putanju prema vašem projektu

const AktivneNarudzbine = sequelize.define('AktivneNarudzbine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_sto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_pice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = AktivneNarudzbine;
