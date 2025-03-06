import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.ts';

const UserEvent = sequelize.define(
	'UserEvent',
	{
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
			defaultValue: DataTypes.NOW(),
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: 'user_event',
	}
)

export default UserEvent;
