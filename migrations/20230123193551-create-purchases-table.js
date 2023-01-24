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
    await queryInterface.createTable('purchases', { 
      id:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      checkoutId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model:'checkouts', key:'id'}
      },
      productId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model:'products', key:'id'}
      },
      qty:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subtotal:{
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
    await queryInterface.dropTable('purchases');
  }
};
