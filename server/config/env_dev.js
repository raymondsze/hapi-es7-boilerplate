/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:08:25
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 03:37:53
*/
// This config will be used if process.env.NODE_ENV is set to 'dev'

const Boom = require('boom');

// validate decoded token
const validate = async function (decoded, request, next) {
	const invalidTokenError = Boom.unauthorized('Token is invalid or expired. Please login again.');
	try {
		// the request.server.methods.session is to obtain cached session in server
		const session = await request.server.methodsAsync.getSession(decoded.id);
		if (decoded.subject.userId === session.subject.userId) {
			// if the session exist, continue to next
			next(null, true, session.subject);
		} else {
			next(invalidTokenError, false);
		}
	} catch (err) {
		request.log(['ERROR'], err);
		next(invalidTokenError, false);
	}
};

module.exports = {
	// Server options used to strat Hapi server
	server: {
		host: 'localhost',
		port: 8080,
		cache: [
			{
				name: 'redis',
				engine: require('catbox-redis'),
				host: '127.0.0.1',
				port: 6379,
				partition: 'cache'
			}
		]
	},
	// Specify token authentication options
	auth: {
		// Secret used to sign access_token
		key: '5e4bde6c-ae02-11e5-bf7f-feff819cdc9f',
		urlKey: 'access-token',
		cookieKey: 'access-token',
		// Validate function
		validateFunc: function (decoded, request, next) {
			validate(decoded, request, next);
		},
		// Verify token options
		verifyOptions: {
			// Set it to true as we use database cache with expire options
			ignoreExpiration: true,
			// Algorithm for signing token
			algorithms: ['HS256'],
			// Audience
			audience: 'company:example',
			// Issuer
			issuer: 'company'
		},
		// Sign token options
		signOptions: {
			// Algorithm for decode token, should be same as verify Options 
			algorithms: ['HS256'],
			// Audience, should be same as verify Options
			audience: 'company:example',
			// Issuer, should be same as verify Options
			issuer: 'company'
		},
		cookieOptions: {
			ttl: 7 * 24 * 60 * 1000,
			encoding: 'none',
			isSecure: false,
			isHttpOnly: true,
			clearInvalid: false,
			strictHeader: true
		}
	},
	csrf: {
		// The csrf setting
		key: 'csrf-token',
		size: 43,
		autoGenerate: true,
		cookieOptions: {
			ttl: 7 * 24 * 60 * 1000,
			encoding: 'none',
			isSecure: false,
			isHttpOnly: true,
			clearInvalid: false,
			strictHeader: true
		},
		restful: true,
		skip: (request) => {
			if (request.url.path === '/login') {
				return true;
			}
			return false;
		}
	},
	// Logger, we use good for logginging
	logger: {
		// This parameter is used to report the operation status for every opsInterval mini-seconds
		// opsInterval: 1000,
		reporters: [{
			reporter: require('good-winston-reporter'),
			events: {
				log: '*',
				request: '*',
				response: '*',
				error: '*'
			},
			config: {
				logger: require('winston')
			}
		}]
	},
	// Database, currently we have mongo (mongoose as connector) only, redis is used for cache
	database: {
		mongo: {
			host: 'localhost',
			port: 27017,
			database: 'example',
			// Mongoose models
			models: ['./server/models']
		}
	},
	// The methods need to be registered, they will be registed into server.methods
	methods: ['./server/methods'],
	// The routes need to be registered
	routes: ['./server/routes'],
	// Acl
	acl: {
		// Roles available for users
		roles: ['ADMIN', 'USER', 'GUEST'],
		// Enable hierachy, inherientance of user roles
		hierachy: true,
		// Lower index have higher access right
		roleHierachy: ['ADMIN', 'USER', 'GUEST']
	}
};
