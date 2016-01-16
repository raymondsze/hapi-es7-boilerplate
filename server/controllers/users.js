/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-30 02:11:09
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-14 02:59:16
*/
const util = require('util');
const _ = require('lodash');
const Joi = require('joi');
const Boom = require('boom');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const error = {
	userNotFound: 'The user id %s does not exist.',
	userListNotFound: 'Unable to obtain user list.',
	emailDuplicate: 'The email address %s is already used.'
};
const validator = {
	username: Joi.string().alphanum().min(3).max(30),
	password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/),
	email: Joi.string().email(),
	role: Joi.string().default('USER'),
	predicate: Joi.string().default('{}'),
	sort: Joi.string().default('{}'),
	page: Joi.number().integer().min(1).default(1),
	pageSize: Joi.number().integer().min(1).max(20).default(20)
};

module.exports = {
	createOne: {
		auth: false,
		validate: {
			payload: {
				username: validator.username.required(),
				password: validator.password.required(),
				email: validator.email.required(),
				role: validator.role.required()
			}
		},
		handler: async function (request, reply) {
			const existingUser = await User.findOne({email: request.payload.email}).exec();
			if (existingUser) {
				reply(Boom.forbidden(util.format(error.emailDuplicate, request.payload.email)));
			} else {
				const validateResult = Joi.any().valid(require('../config').acl.roles).validate(request.payload.role);
				if (!validateResult.error) {
					const user = new User(_.merge(request.payload, {
						password: bcrypt.hashSync(request.payload.password, 10)
					}));
					const result = await user.save();
					reply(await result.getInfo());
				} else {
					throw Error(validateResult.error);
				}
			}
		}
	},
	read: {
		auth: 'jwt',
		plugins: {
			hapiAuthorization: {role: 'ADMIN'}
		},
		validate: {
			query: {
				page: validator.page.optional(),
				pageSize: validator.pageSize.optional(),
				predicate: validator.predicate.optional(),
				sort: validator.sort.optional()
			}
		},
		handler: async function (request, reply) {
			const predicate = JSON.parse(request.query.predicate);
			const sort = JSON.parse(request.query.sort);
			const page = request.query.page;
			const pageSize = request.query.pageSize;

			const result = await User.find(predicate).sort(sort).skip((page - 1) * pageSize).limit(pageSize).exec();
			if (!result) {
				reply(Boom.notFound(error.userListNotFound));
			} else {
				reply(await Promise.all(_.map(result || [], (user) => user.getInfo())));
			}
		}
	},
	readOne: {
		auth: 'jwt',
		handler: async function (request, reply) {
			const result = await User.findByIdAsync(request.params.userId);
			if (!result) {
				reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
			} else {
				reply(result.getInfo());
			}
		}
	},
	updateOne: {
		auth: 'jwt',
		validate: {
			payload: {
				username: validator.username.optional(),
				password: validator.password.optional(),
				email: validator.email.optional(),
				role: validator.role.optional()
			}
		},
		handler: async function (request, reply) {
			const existingUser = await User.findByIdAsync(request.params.userId);
			if (!existingUser) {
				reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
			} else {
				await existingUser.updateAsync(_.merge(request.payload, request.payload.password ? {
					password: bcrypt.hashSync(request.payload.password, 10)
				} : {}));
				const result = await User.findByIdAsync(request.params.userId);
				reply(await result.getInfo());
			}
		}
	},
	deleteOne: {
		auth: 'jwt',
		handler: async function (request, reply) {
			const existingUser = await User.findByIdAsync(request.params.userId);
			if (!existingUser) {
				reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
			} else {
				const result = await existingUser.removeAsync();
				reply(await result.getInfo());
			}
		}
	}
};
