import { Server } from '@hapi/hapi';
import { TimeEntryService } from '../service/time_entry_service';
import { ModelStatic, Model } from 'sequelize';

interface reqBody {
	title: string;
	duration: number;
}

export function routes(server: Server, timeEntryDb: ModelStatic<Model<any, any>>) {
	const timeEntryService = new TimeEntryService(timeEntryDb);

	server.route({
		method: 'POST',
		path: '/api/timeentries',
		handler: (req, h) => {
			const body: reqBody = req.payload as reqBody;
			console.log(body);
			//call the service function to save data to database
			timeEntryService.createEntry(body.title, body.duration);
			return h.response('Entry saved successfullly!').code(200);
		},
	});
	server.route({
		method: 'GET',
		path: '/api/timeentries',
		handler: (req, h) => {
			//call the service function to fetch data from database
			return h.response(timeEntryService.getEntries()).code(200);
		},
	});
}
