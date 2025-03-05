import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
const createGeneratedToken = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('generated-tokens', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.UUID
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
				defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('generated-tokens');
  }
};

export default createGeneratedToken;

