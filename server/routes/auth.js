/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:43:46
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-12 23:24:36
*/

const {auth} = require('../controllers');
module.exports = [
	{method: 'POST', path: '/login', config: auth.login},
	{method: ['GET', 'POST'], path: '/logout', config: auth.logout}
];
