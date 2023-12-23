
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kafic_baza', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

});


module.exports = sequelize;
