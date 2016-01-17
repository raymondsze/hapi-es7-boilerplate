/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-30 02:11:09
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 01:51:33
*/

import util from 'util';
import _ from 'lodash';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import Boom from 'boom';
import bcrypt from 'bcrypt';

import config from '../config';
import User from '../models/User';

Joi.objectId = JoiObjectId(Joi);

const error = {
	userNotFound: 'The user id %s does not exist.',
	userListNotFound: 'Unable to obtain user list.',
	unableToUpdateOtherUser: 'You are unable to update other user.',
	emailDuplicate: 'The email address %s is already used.'
};
const validator = {
	userId: Joi.objectId(),
	username: Joi.string().alphanum().min(3).max(30),
	password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/),
	email: Joi.string().email(),
	role: Joi.string().default('USER'),
	predicate: Joi.string().default('{}'),
	sort: Joi.string().default('{}'),
	page: Joi.number().integer().min(1).default(1),
	pageSize: Joi.number().integer().min(1).max(20).default(20)
};

export default {
	createOne: {
		auth: 'jwt',
		validate: {
			payload: {
				username: validator.username.required(),
				password: validator.password.required(),
				email: validator.email.required(),
				role: validator.role.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const existingUser = await User.findOne({email: request.payload.email}).exec();
				if (existingUser) {
					return reply(Boom.forbidden(util.format(error.emailDuplicate, request.payload.email)));
				}
				const validateResult = Joi.any().valid(config.acl.roles).validate(request.payload.role);
				if (!validateResult.error) {
					const user = new User(_.merge(request.payload, {
						password: bcrypt.hashSync(request.payload.password, 10)
					}));
					const result = await user.save();
					return reply(await result.getInfo());
				}
				throw validateResult.error;
			}
		}
	},
	read: {
		auth: 'jwt',
		validate: {
			query: {
				page: validator.page.optional(),
				pageSize: validator.pageSize.optional(),
				predicate: validator.predicate.optional(),
				sort: validator.sort.optional()
			}
		},
		handler: {
			async: async function (request, reply) {
				const predicate = JSON.parse(request.query.predicate);
				const sort = JSON.parse(request.query.sort);
				const page = request.query.page;
				const pageSize = request.query.pageSize;

				const result = await User.find(predicate).sort(sort).skip((page - 1) * pageSize).limit(pageSize).exec();
				if (!result) {
					return reply(Boom.notFound(error.userListNotFound));
				}
				reply(await Promise.all(_.map(result || [], (user) => user.getInfo())));
			}
		}
	},
	readOne: {
		auth: 'jwt',
		validate: {
			params: {
				userId: validator.userId.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const result = await User.findById(request.params.userId).exec();
				if (!result) {
					return reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
				}
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
			},
			params: {
				userId: validator.userId.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const {role, userId} = request.auth.credentials;
				if (role !== 'ADMIN' && userId !== request.params.userId) {
					return reply(Boom.forbidden(error.unableToUpdateOtherUser));
				}
				const existingUser = await User.findById(request.params.userId).exec();
				if (!existingUser) {
					return reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
				}
				await existingUser.update(_.merge(request.payload, request.payload.password ? {
					password: bcrypt.hashSync(request.payload.password, 10)
				} : {}));
				const result = await User.findById(request.params.userId).exec();
				return reply(await result.getInfo());
			}
		}
	},
	deleteOne: {
		auth: 'jwt',
		plugins: {
			hapiAuthorization: {role: 'ADMIN'}
		},
		validate: {
			params: {
				userId: validator.userId.required()
			}
		},
		handler: {
			async: async function (request, reply) {
				const existingUser = await User.findById(request.params.userId).exec();
				if (!existingUser) {
					return reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
				}
				const result = await existingUser.remove();
				return reply(await result.getInfo());
			}
		}
	}
};
