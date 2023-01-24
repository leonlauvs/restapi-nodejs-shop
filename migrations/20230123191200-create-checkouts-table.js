'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('checkouts', { 
      id:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      code:{
        type: Sequelize.STRING,
      },
      firstName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      address1:{
        type: Sequelize.STRING,
        allowNull: false
      },
      address2:{
        type: Sequelize.STRING
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false
      },
      state:{
        type: Sequelize.STRING
      },
      zip:{
        type: Sequelize.STRING,
        allowNull: false
      },
      country:{
        type: Sequelize.STRING,
        allowNull: false
      },
      total:{
        type: Sequelize.INTEGER
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: true
      },
      createdBy:{
        type: Sequelize.STRING
      },
      updatedBy:{
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('checkouts');
  }
};
