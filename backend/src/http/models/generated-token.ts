import { DataTypes } from 'sequelize'
import sequelize from '../../database/database.ts'

const GeneratedToken = sequelize.define(
	'GeneratedToken',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
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
	},
	{
		tableName: 'generated-tokens'
	}
)

export default GeneratedToken
