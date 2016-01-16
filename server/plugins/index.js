/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 03:01:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 03:54:25
*/
const _ = require('lodash');
const requireDirectory = require('require-directory');
const toposort = require('toposort');
const modules = requireDirectory(module, {exclude: /lib/});

// get all module name as key, which equal to node of vector graph
const nodes = _.keys(modules);
// get all edges (linkage) among nodes
const edges = _.reduce(modules, (result, plugin, name) => {
	if (plugin.require) {
		_.each(plugin.require, (requirePlugin) => {
			result.push([name, requirePlugin]);
		});
	}
	return result;
}, []);

// do topological sort to make sure the order is right and exports
module.exports = _.map(_(toposort.array(nodes, edges)).reverse().value(), (name) => modules[name]);
