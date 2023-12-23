// models/korisnik.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config.js'); // Prilagodite putanju prema vašem projektu

const Korisnik = sequelize.define('Korisnik', {
  korisnickoIme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sifra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tip: {
    type: DataTypes.STRING, // ili DataTypes.ENUM('konobar', 'sank') ako želite koristiti enum tip
    allowNull: false,
  },
});

module.exports = Korisnik;
