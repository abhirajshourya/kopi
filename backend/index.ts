import Hapi from '@hapi/hapi';
import { routes } from './src/routes/routes';
import connDB from './src/utils/conn_db';
import { Model, ModelStatic } from 'sequelize';

export class Server {
	private server: Hapi.Server<Hapi.ServerApplicationState>;
	public timeEntryDb: ModelStatic<Model<any, any>>;
	constructor() {
		this.server = Hapi.server({
			port: 3000,
			host: 'localhost',
			routes: {
				cors: {
					origin: ['*'], // Set your allowed origins here
				},
			},
		});
	}

	async start() {
		try {
			this.timeEntryDb = await connDB();
			routes(this.server, this.timeEntryDb);

			await this.server.start();
			console.log('Server running on %s', this.server.info.uri);
		} catch (err) {
			console.log(err);
			process.exit(1);
		}
	}
}

const server = new Server();
server.start();

export default server;
