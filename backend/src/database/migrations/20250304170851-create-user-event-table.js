'use strict';
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
const createUserEventTableMigration = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		await queryInterface.createTable('user-event', {
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			eventId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Events',
					key: 'id',
				},
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
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
	await queryInterface.dropTable('user-event');
  }
};
export default createUserEventTableMigration;

