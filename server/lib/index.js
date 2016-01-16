/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-28 23:29:18
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-14 02:09:54
*/

const _ = require('lodash');
const requireDirectory = require('require-directory');
module.exports = _.flatten(_.map(requireDirectory(module), (lib) => lib));
