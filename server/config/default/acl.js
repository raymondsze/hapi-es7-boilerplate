/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-11 00:01:35
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 14:44:32
*/

export default {
	// Roles available for users
	roles: ['ADMIN', 'USER', 'GUEST'],
	// Enable hierachy, inherientance of user roles
	hierachy: true,
	// Lower index have higher access right
	roleHierachy: ['ADMIN', 'USER', 'GUEST']
};
