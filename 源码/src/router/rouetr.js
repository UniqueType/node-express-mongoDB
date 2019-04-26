const config = require('../../config/config');
const readFile = require('../common/js/readFile');
function route(handle, pathname, req, res) {
    console.log('About to route a req for ' + pathname);
    // console.log(typeof handle[pathname] === 'function');
    if (typeof handle[pathname] === 'function') {
        // console.log(req.method.toLowerCase() + '===' + config.methods[pathname].method);
    	if (config.methods[pathname] && config.methods[pathname].method.match(req.method.toLowerCase())) {
        	handle[pathname](req, res);
    	} else {
    		res.writeHead(500, { 'Content-Type': '*' });
            res.write('Cannot read property method ' + req.method + ' undefined');
            res.end();
    	}
    } else {
    	readFile.readFile(pathname, res);
        // console.log('No req handler found for ' + pathname);
        // res.writeHead(404, { 'Content-Type': 'text/plain' });
        // res.write('404 Not found');
        // res.end();
    }
}

exports.route = route;