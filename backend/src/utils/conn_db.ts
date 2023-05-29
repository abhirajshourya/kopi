import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default async function connDB() {
	try {
		// Create a Sequelize instance and specify the SQLite database file
		const sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: './kopi.sqlite', // Path to the SQLite file
		});

		//test connection
		await sequelize.authenticate();
		console.info('Connection has been established successfully.');

		// Define a model for your data table
		const TimeEntry = sequelize.define('TimeEntry', {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: () => uuidv4(),
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		});

		// Synchronize the model with the database (create the table if it doesn't exist)
		async function syncModels() {
			await sequelize.sync({ force: true });
			console.log('Models synchronized');
		}

		syncModels().catch((error) => {
			console.error('Error synchronizing models:', error);
		});

		return TimeEntry;
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
