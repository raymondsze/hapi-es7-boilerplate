/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:32:28
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 20:06:46
*/
import CatboxRedis from 'catbox-redis';
export default {
	host: 'localhost',
	port: 8080,
	cache: [
		{
			name: 'redis',
			engine: CatboxRedis,
			host: '127.0.0.1',
			port: 6379,
			partition: 'cache'
		}
	]
};
