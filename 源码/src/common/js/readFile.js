// readFile.js
const fs = require('fs');
const path = require('path');
module.exports = {
    readFile: function(pathname, res) {
        const filePath = path.join(__dirname, '../../') + pathname;
        fs.readFile(filePath, 'binary', function(err, file) {
            if (err) {
                console.log('No request handler found for ' + pathname);
                res.writeHead(404, { 'Content-Type': '*' });
                res.write('404 Not found');
                // res.write(JSON.stringify(err));
                res.end();
                return;
            } else {
                console.log('输出路径' + filePath);
                res.writeHead(200, { 'Content-Type': '*' });
                res.write(file, 'binary');
                res.end();
            }
        });
    }
};