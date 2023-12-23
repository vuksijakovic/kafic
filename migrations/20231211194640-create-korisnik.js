// migrations/XXXXXXXXXXXXXX-create-korisnik.js (trenutno vreme će biti u nazivu datoteke)
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Korisnici', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      korisnickoIme: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sifra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Korisnici');
  },
};
