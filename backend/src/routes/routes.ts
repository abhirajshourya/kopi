import { Server } from '@hapi/hapi';
import { TimeEntryModel, TimeEntryService } from '../service/time_entry_service';
import { ModelStatic, Model, Identifier } from 'sequelize';

interface reqBody {
	title: string;
	duration: number;
}

export function routes(server: Server, timeEntryDb: ModelStatic<Model<any, any>>) {
	const timeEntryService = new TimeEntryService(timeEntryDb);

	server.route({
		method: 'POST',
		path: '/api/timeentries',
		handler: async (req, h) => {
			const body: TimeEntryModel = req.payload as TimeEntryModel;
			//call the service function to save data to database
			const entry = await timeEntryService.createEntry(body);
			return `Entry with id:${entry.id} saved successfullly!`;
		},
	});
	server.route({
		method: 'GET',
		path: '/api/timeentries',
		handler: (req, h) => {
			//call the service function to fetch data from database
			return timeEntryService.getEntries();
		},
	});

	server.route({
		method: 'GET',
		path: '/api/timeentries/{id}',
		handler: (req, h) => {
			const id = req.params.id;
			//call the service function to fetch data by id from database
			return timeEntryService.getEntryById(id);
		},
	});

	server.route({
		method: 'PUT',
		path: '/api/timeentries',
		handler: (req, h) => {
			if (typeof req.payload === 'object' && req.payload !== null && 'id' in req.payload) {
				const id = <Identifier>req.payload.id;
				const payload = req.payload as TimeEntryModel;

				//call the service function to update the data in database
				return timeEntryService.updateEntry(id, payload);
			}
			return 'Error while updating the entry!';
		},
	});

	server.route({
		method: 'DELETE',
		path: '/api/timeentries/{id}',
		handler: (req, h) => {
			const id = req.params.id;
			try {
				//call the service function to update the data in database
				return timeEntryService.deleteEntry(id);
			} catch (err) {
				console.log('Error: ', err);
				return 'Error while deleting the entry!';
			}
		},
	});
}
