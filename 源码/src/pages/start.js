const exec = require('child_process').exec;

function start(req, res) {
    console.log('Request handler start was called.');
    exec('ls -lah', function(error, stdout, stderr) {
        const toLink = 'javascript:void(window.location.href="/getUserInfo")';
        const body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<form action="/upload" method="post">' +
            '<textarea name="text" rows="20" cols="60"></textarea>' +
            '<input type="submit" value="to upload" />' +
            '</form>' +
            '<img src="../common/assets/test.png"' +
            '>' +
            '<div onclick=' + toLink + '>' +
             'getUserInfo' +
            '</div>' +
            '</body>' +
            '</html>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(body);
        res.end();
    });
}

exports.start = start;