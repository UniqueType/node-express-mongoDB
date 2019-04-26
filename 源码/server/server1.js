const http = require('http');
const url = require('url');
const config = require('../config/config');

function start(route, handle) {
    function onRequest(request, response) {
        const pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        // response.header('Access-Control-Allow-Origin', '*'); // 设置跨域访问
		// response.header('Access-Control-Allow-Headers', 'X-Requested-With');
		// response.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
		// response.header('Content-Type', 'application/json;charset=utf-8');
        route(handle, pathname, response);
    }
    http.createServer(onRequest).listen(config.dev.port);
    console.log('Server has started. Listening at http://' + config.dev.host + ':' + config.dev.port);
}

exports.start = start;