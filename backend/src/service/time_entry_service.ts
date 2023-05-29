import { ModelStatic, Model } from 'sequelize';

export class TimeEntryService {
	private TimeEntry: ModelStatic<Model<any, any>>;

	constructor(timeEntryDb: ModelStatic<Model<any, any>>) {
		this.TimeEntry = timeEntryDb;
	}

	async createEntry(title: String, duration: Number) {
		try {
			const entry = await this.TimeEntry.create({ title, duration });
			console.log('Entry created:', entry.toJSON());
			return entry.toJSON();
		} catch (error) {
			console.error('Error creating entry:', error);
		}
	}

	async getEntries() {
		try {
			const entries = await this.TimeEntry.findAll();
			console.log(
				'Entries:',
				entries.map((entry) => entry.toJSON())
			);
		} catch (error) {
			console.error('Error getting entries:', error);
		}
	}

	async updateEntry(id, title) {
		try {
			const entry = await this.TimeEntry.findByPk(id);
			if (entry) {
				entry.title = title;
				await entry.save();
				console.log('Entry updated:', entry.toJSON());
			} else {
				console.log('Entry not found');
			}
		} catch (error) {
			console.error('Error updating entry:', error);
		}
	}

	async deleteEntry(id) {
		try {
			const entry = await this.TimeEntry.findByPk(id);
			if (entry) {
				await entry.destroy();
				console.log('Entry deleted');
			} else {
				console.log('Entry not found');
			}
		} catch (error) {
			console.error('Error deleting entry:', error);
		}
	}
}
