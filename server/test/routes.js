/*
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-14 04:03:34
*/

const _ = require('lodash');
const Lab = require('lab');
const bcrypt = require('bcrypt');
const server = require('../server');
const Code = require('code');
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
			const header = res.headers['set-cookie'];
			const cookies = _.join(_.map(_.map(header, (cookie) => {
				return cookie.match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
			}), (cookie) => cookie[0] + '=' + cookie[1]), ',');
			callback(JSON.parse(res.payload), cookies);
		});
	};

	lab.before((done) => {
		const createUsers = async function () {
			const User = server.mongoose.models.User;
			const admin = await User.create(_.merge({}, adminUser, {password: bcrypt.hashSync(adminUser.password, 10)}));
			const user = await User.create(_.merge({}, normalUser, {password: bcrypt.hashSync(normalUser.password, 10)}));
			adminId = admin.id;
			userId = user.id;
			done();
		};
		createUsers();
	});

	lab.after((done) => {
		const removeUsers = async function () {
			const User = server.mongoose.models.User;
			await User.findByIdAndRemove(adminId);
			await User.findByIdAndRemove(userId);
			done();
		};
		removeUsers();
	});

	lab.test('readOne', (done) => {
		login(adminUser, (payload, cookies) => {
			console.error(payload['access-token']);
			console.error(cookies.split(',')[1]);
			const options = {
				method: 'GET',
				url: '/users',
				headers: {
					cookie: cookies.split(',')[1]
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
			});
			done();
		});
	});

	lab.test('read', (done) => {
		login(adminUser, (payload, cookies) => {
			const options = {
				method: 'GET',
				url: '/users/' + adminId,
				headers: {
					cookie: cookies
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
			});
			done();
		});
	});

	lab.test('updateOne', (done) => {
		login(adminUser, (payload, cookies) => {
			const options = {
				method: 'PUT',
				url: '/users/' + adminId,
				headers: {
					cookie: cookies
				},
				payload: {
					username: 'admin2',
					email: 'admin2@admin.com',
					password: 'admin12345',
					role: 'USER'
				}
			};
			server.inject(options, (res) => {
				Code.expect(res.statusCode).to.equal(200);
			});
			done();
		});
	});
});

module.exports = lab;
