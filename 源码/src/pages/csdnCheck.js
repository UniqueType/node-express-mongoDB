const exec = require('child_process').exec;
const querystring = require('querystring');
const url = require('url');
const request = require('../common/js/request.js');

function csdnCheck(req, res) {
    exec('ls -lah', function(error, stdout, stderr) {
        const urlParams = url.parse(req.url).query;
        console.log('urlParams==' + urlParams);
        request.requestGet(urlParams, function(data) {
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' });
            res.write(data);
            res.end();
        });
    });
}

exports.csdnCheck = csdnCheck;