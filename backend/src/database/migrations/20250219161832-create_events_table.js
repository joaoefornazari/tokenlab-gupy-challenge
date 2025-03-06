'use strict';
import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			description: {
				type: Sequelize.TEXT('medium'),
				allowNull: false,
			},	
			start_datetime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_datetime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT('long'),
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};

export default migration;
