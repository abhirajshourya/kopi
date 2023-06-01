import { ModelStatic, Model, Identifier } from 'sequelize';

export interface TimeEntryModel extends Model {
	id: Identifier;
	tag: String;
	duration: Number;
}

export class TimeEntryService {
	private TimeEntry: ModelStatic<Model<any, any>>;

	constructor(timeEntryDb: ModelStatic<Model<any, any>>) {
		this.TimeEntry = timeEntryDb;
	}

	async createEntry(body: TimeEntryModel) {
		try {
			const entry = await this.TimeEntry.create({ ...body });
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
			return entries;
		} catch (error) {
			console.error('Error getting entries:', error);
		}
	}
	async getEntryById(id: Identifier) {
		try {
			const entry = await this.TimeEntry.findByPk(id);
			if (entry) {
				return entry;
			} else {
				return 'Entry not found';
			}
		} catch (error) {
			console.error('Error getting entry:', error);
			return 'Entry not found';
		}
	}

	async updateEntry(id: Identifier, payload: TimeEntryModel) {
		try {
			const entry = (await this.TimeEntry.findByPk(id)) as TimeEntryModel;
			if (entry) {
				entry.tag = payload.tag;
				entry.duration = payload.duration;
				await entry.save();
				console.log('Entry updated:', entry.toJSON());
				return entry.toJSON();
			} else {
				console.log('Entry not found');
				return 'Entry not found';
			}
		} catch (error) {
			console.error('Error updating entry:', error);
			return { 'Error updating entry:': error };
		}
	}

	async deleteEntry(id: Identifier) {
		try {
			const entry = await this.TimeEntry.findByPk(id);
			if (entry) {
				await entry.destroy();
				console.log('Entry deleted');
				return 'Entry deleted';
			} else {
				console.log('Entry not found');
				return 'Entry not found';
			}
		} catch (error) {
			console.error('Error deleting entry:', error);
			return 'Error deleting entry';
		}
	}
}
