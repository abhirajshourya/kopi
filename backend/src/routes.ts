import { Server } from '@hapi/hapi';

export function routes(server: Server) {
	server.route({
		method: 'GET',
		path: '/',
		handler: (request, handler) => {
			return 'Hello World!';
		},
	});

	server.route({
		path: '/new',
		method: 'GET',
		handler: (req, h) => {
			console.log(req.query.user);
			return req.query.user;
		},
	});

	server.route({
		method: 'POST',
		path: '/save',
		handler: (req, h) => {
			return req.payload;
		},
	});
	server.route({
		method: 'PUT',
		path: '/save',
		handler: (req, h) => {
			return req.payload;
		},
	});
	server.route({
		method: 'DELETE',
		path: '/save',
		handler: (req, h) => {
			return req.payload;
		},
	});
}
