const exec = require('child_process').exec;
const querystring = require('querystring');

function getUserInfo(req, res) {
    exec('ls -lah', function(error, stdout, stderr) {
        // 暂存请求体信息
        let userInfo = '';
        // 请求链接
        console.log(req.url);
        // 每当接收到请求体数据，累加到post中
        req.on('data', function(chunk) {
            userInfo += chunk; // 一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        });
        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on('end', function() {
            // 解析参数
            userInfo = querystring.parse(userInfo); // 将一个字符串反序列化为一个对象
            userInfo.desc = userInfo.name + ' is a man, his age is ' + userInfo.age + ' years old'
            // console.log('userInfo:', userInfo);
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' });
            // res.write(stdout);
            res.write(JSON.stringify(userInfo));
            res.end();
        });
    });
}

exports.getUserInfo = getUserInfo;