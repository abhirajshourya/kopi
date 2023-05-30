import { Sequelize, DataTypes } from 'sequelize';
import { TimeEntryModel } from '../models/time_entry';

export default async function connDB() {
	try {
		// Create a Sequelize instance and specify the SQLite database file
		const sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: './kopi.sqlite', // Path to the SQLite file
		});

		// Test connection
		await sequelize.authenticate();
		console.info('Connection has been established successfully.');

		// Define a model for data table
		const TimeEntry = sequelize.define('TimeEntry', TimeEntryModel);

		// Synchronize the model with the database (create the table if it doesn't exist)
		async function syncModels() {
			await sequelize.sync();
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
