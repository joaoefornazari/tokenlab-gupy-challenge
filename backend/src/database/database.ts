import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USER as string,
	process.env.DB_PASSWORD,
	{
		host:  process.env.DB_HOST,
		dialect: process.env.DB_DIALECT as Dialect,
		port: parseInt(process.env.DB_PORT as string),
	}
);

/**
 * Testing database connection
 */
try {
	sequelize.authenticate().then(() => {
		console.log('Connection has been established successfully.');
	});
} catch (error) {
	console.log('Unable to connect to the database:', error);
}

export default sequelize;
