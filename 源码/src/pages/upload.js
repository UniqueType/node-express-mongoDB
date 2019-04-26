const exec = require('child_process').exec;
const readFile = require('../common/js/readFile');
function upload1(req, res) {
    console.log('Request handler upload was called.');
    exec('ls -lah', function(error, stdout, stderr) {
        const toLink = 'javascript:void(window.location.href="https://yipay.ctdns.net/html/h5-page/sign-in-share/rule.html")';
        const body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<div onclick=' + toLink + '>' +
            '点我试试看' +
            '</div>' +
            '</body>' +
            '</html>';
        // 或者通过a链接也可以  '<a href="https://yipay.ctdns.net/html/h5-page/sign-in-share/rule.html">' +
        // '点我试试看' +
        // '</a>'+
        res.writeHead(200, { 'Content-Type': '*' });
        res.write(body);
        res.end();
    });
}

function upload(req, res) {
    console.log('Request handler upload was called.');
    readFile.readFile('/common/assets/test.png', res); //如果文件路径存在则添加数据，如果不存在则新建文件并且添加数据
    // var form = new formidable.IncomingForm();
    // form.parse(req, function(error, fields, files) {
    //     // const imgUrl = 'https://www.baidu.com/img/bd_logo1s.png';
    //     const imgUrl = './test.png';
    //     // fs.renameSync('D:/node_learn1/src/common/assets/test.png');
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('received image:<br/>');
    //     res.write('<img src=' + imgUrl + ' />');
    //     res.end();
    // });
}

exports.upload = upload;
// export default {
//  upload
// }