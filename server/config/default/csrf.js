module.exports = {
	key: 'csrf-token',
	size: 43,
	autoGenerate: false,
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
};
