const request = require('../common/js/request.js');
const querystring = require('querystring');
const exec = require('child_process').exec;

const queryPunchInRule = (req, res) => {
	exec('ls -lah', function(error, stdout, stderr) {
		let params = '';
		req.on('data', function(chunk) {
			params += chunk;
		});
		req.on('end', function() {
			params = querystring.parse(params);
			request.requestPost('https://mapi.bestpay.com.cn/mapi/roulette/queryPunchInRule', params, (data) => {
				// console.log(res);
				res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' });
		        res.write(data);
		        res.end();
			});
		});
	})
}
exports.queryPunchInRule = queryPunchInRule;