const app = require('express')();
const http = require('http');
const url = require('url');
const config = require('../config/config');

// 利用express解决了跨域问题
function start(route, handle) {
    app.all('*', function(req, res, next) {
        req.setEncoding('utf8');
        const pathname = url.parse(req.url).pathname;
        console.log('req for ' + pathname + ' received.');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', config.methods[pathname] && config.methods[pathname].method || 'get');
        res.header('Access-Control-Allow-Headers', 'X-reqed-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        route(handle, pathname, req, res);
        // next();
    });
    http.createServer(app).listen(config.dev.port, function() {
        console.log('Server has started. Running at http://' + config.dev.host + ':' + config.dev.port);
    });
}

// 需在相同域名下
function start1(route, handle) {
    function onRequest(req, res) {
        const pathname = url.parse(req.url).pathname;
        console.log('req for ' + pathname + ' received.');
        req.setEncoding('utf8');
        route(handle, pathname, res);
    }
    http.createServer(onRequest).listen(config.dev.port, function() {
        console.log('Server has started. Running at http://' + config.dev.host + ':' + config.dev.port);
    });
}


exports.start = start;
// exports.start = start1;