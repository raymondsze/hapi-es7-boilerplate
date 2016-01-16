/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-30 01:41:05
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-14 01:50:39
*/

const aguid = require('aguid');
const Boom = require('boom');
const Joi = require('joi');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const User = require('../models/User');

module.exports = {
	login: {
		auth: false,
		/**
		 * [validate description]
		 * @type {Object}
		 */
		validate: {
			payload: {
				password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
				email: Joi.string().email().required()
			}
		},
		handler: async function (request, reply) {
			// get the user from the request payload
			const user = await User.findOneAsync({email: request.payload.email});
			// if user not found, return an unauthorized status code
			if (!user) {
				throw Boom.unauthorized('Username is incorrect. Please login again.');
			} else {
				// check if password is valid by using bcrypt compare
				const valid = await bcrypt.compareAsync(request.payload.password, user.password);
				// if it is valid, construct a cookie options since we use cookie to store the access token
				if (valid) {
					// sign the token
					const sessionId = aguid();
					const session = await request.server.methodsAsync.getSession(sessionId, {id: sessionId, userId: user.id, role: user.role});
					const token = await request.server.methodsAsync.sign(session);
					request.server.plugins.crumb.generate(request, reply);
					const {urlKey, cookieKey} = require('../config').auth;
					const {key: csrfKey} = require('../config').csrf;
					
					reply({[urlKey]: token, [csrfKey]: request.plugins.crumb}).header('Authorization', token).state(cookieKey, token, request.cookieOptions);
				} else {
					throw Boom.unauthorized('Password is incorrect. Please login again.');
				}
			}
		}
	},
	logout: {
		auth: 'jwt',
		handler: async function (request, reply) {
			await request.server.methodsAsync.getSession.cache.dropAsync(request.auth.credentials.id);
			reply('Successfully logout');
		}
	}
};
