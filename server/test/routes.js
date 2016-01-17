/*
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 01:54:56
*/

import _ from 'lodash';
import Lab from 'lab';
import bcrypt from 'bcrypt';
import Code from 'code';

import config from '../config';
import server from '../server';
import User from '../models/User';
const lab = Lab.script();

const adminUser = {
	username: 'admin',
	email: 'admin@admin.com',
	password: 'admin1234',
	role: 'ADMIN'
};

const normalUser = {
	username: 'user',
	email: 'user@user.com',
	password: 'user1234',
	role: 'USER'
};

const normalUser2 = {
	username: 'user23',
	email: 'user23@user.com',
	password: 'user1234',
	role: 'USER'
};

lab.experiment('Users', {timeout: 5000}, function () {
	let adminId;
	let userId;

	const login = function (user, callback) {
		server.inject({
			method: 'POST',
			url: '/login',
			payload: {
				email: user.email,
				password: user.password
			}
		}, (res) => {
			callback(JSON.parse(res.payload));
		});
	};

	lab.before((done) => {
		// create admin user and normal user
		const createUsers = async function () {
			await User.remove({});
			const admin = await User.create(_.merge({}, adminUser, {password: bcrypt.hashSync(adminUser.password, 10)}));
			const user = await User.create(_.merge({}, normalUser, {password: bcrypt.hashSync(normalUser.password, 10)}));
			adminId = admin.id;
			userId = user.id;
			done();
		};
		createUsers();
	});

	lab.test('create user', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'POST',
				url: '/users',
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: normalUser2
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.username).to.equal(normalUser2.username);
				Code.expect(resPayload.email).to.equal(normalUser2.email);
				Code.expect(resPayload.role).to.equal(normalUser2.role);
				done();
			});
		});
	});

	lab.test('create duplicated user', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'POST',
				url: '/users',
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: normalUser2
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(403);
				done();
			});
		});
	});

	lab.test('create user with invalid payload', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'POST',
				url: '/users',
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: {
					username: '12345',
					password: 'abc',
					email: 'eeee',
					role: 'SUPERMAN'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(400);
				done();
			});
		});
	});

	lab.test('read user', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'GET',
				url: '/users/' + adminId,
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.username).to.equal(adminUser.username);
				Code.expect(resPayload.email).to.equal(adminUser.email);
				Code.expect(resPayload.role).to.equal(adminUser.role);
				done();
			});
		});
	});

	lab.test('read user with not exisiting id', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'GET',
				url: '/users/' + '569bba800000000000000000',
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(404);
				done();
			});
		});
	});

	lab.test('read all user', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'GET',
				url: '/users',
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.length).to.equal(3);
				done();
			});
		});
	});

	lab.test('update other user with admin role', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'PUT',
				url: '/users/' + userId,
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: {
					username: 'userTest'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.username).to.equal('userTest');
				done();
			});
		});
	});

	lab.test('update user with not existing id with admin role', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'PUT',
				url: '/users/' + '569bba800000000000000000',
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: {
					username: 'userTest'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(404);
				done();
			});
		});
	});

	lab.test('update other user with user role', (done) => {
		login(normalUser, (payload) => {
			const options = {
				method: 'PUT',
				url: '/users/' + adminId,
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: {
					username: 'userTest'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(403);
				done();
			});
		});
	});

	lab.test('update self with user role', (done) => {
		login(normalUser, (payload) => {
			const options = {
				method: 'PUT',
				url: '/users/' + userId,
				headers: {
					authorization: payload[config.auth.urlKey]
				},
				payload: {
					username: 'userTest'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.username).to.equal('userTest');
				done();
			});
		});
	});

	lab.test('delete other user with user role', (done) => {
		login(normalUser, (payload) => {
			const options = {
				method: 'DELETE',
				url: '/users/' + adminId,
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(403);
				done();
			});
		});
	});

	lab.test('delete self with user role', (done) => {
		login(normalUser, (payload) => {
			const options = {
				method: 'DELETE',
				url: '/users/' + userId,
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(403);
				done();
			});
		});
	});

	lab.test('delete other user with non exisitng id with admin role', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'DELETE',
				url: '/users/' + '569bba800000000000000000',
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(404);
				done();
			});
		});
	});

	lab.test('delete other user with admin role', (done) => {
		login(adminUser, (payload) => {
			const options = {
				method: 'DELETE',
				url: '/users/' + userId,
				headers: {
					authorization: payload[config.auth.urlKey]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
				const resPayload = JSON.parse(res.payload);
				Code.expect(resPayload.username).to.equal('userTest');
				done();
			});
		});
	});
});

export default lab;
