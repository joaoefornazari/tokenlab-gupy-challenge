'use strict';
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
const createUsersTableMigration = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4(),
				autoIncrement: false,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.TEXT('medium'),
				allowNull: false,
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
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('users');
  }
};
export default createUsersTableMigration;
