/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:08:44
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-12 23:31:40
*/
module.exports = {
	// Secret used to sign access_token
	key: '5e4bde6c-ae02-11e5-bf7f-feff819cdc9f',
	urlKey: 'access-token',
	cookieKey: 'access-token',
	// Validate function
	validateFunc: function (decoded, request, next) {
		next(null, true, decoded);
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
};
