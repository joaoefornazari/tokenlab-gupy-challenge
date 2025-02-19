import { DataTypes } from 'sequelize';
import sequelize from '../../database/database';

const Event = sequelize.define(
	'Event',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.TEXT('medium'),
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
			allowNull: false,
		},
		/*
		timezone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		*/
	},
	{
		tableName: 'events',
	}
);

export default Event;
