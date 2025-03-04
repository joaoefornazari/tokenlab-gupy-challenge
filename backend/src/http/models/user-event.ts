import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.ts';

const UserEvent = sequelize.define(
	'UserEvent',
	{
		userId: {
			type: DataTypes.UUIDV4,
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
	},
	{
		tableName: 'user-event',
	}
)

export default UserEvent;