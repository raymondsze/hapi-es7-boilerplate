/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 03:01:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 01:24:07
*/
import _ from 'lodash';
import requireDirectory from 'import-directory';
import toposort from 'toposort';
const modules = requireDirectory(module, {exclude: /lib/});

// get all module name as key, which equal to node of vector graph
const nodes = _.keys(modules);
// get all edges (linkage) among nodes
let index = 0;
const edges = _.reduce(modules, (result, plugin, name) => {
	if (plugin.disabled) {
		nodes.splice(index, 1);
	} else if (plugin.require) {
		_.each(plugin.require, (requirePlugin) => {
			result.push([name, requirePlugin]);
		});
	}
	index = index + 1;
	return result;
}, []);
// do topological sort to make sure the order is right and exports
export default _.map(_(toposort.array(nodes, edges)).reverse().value(), (name) => modules[name]);
