const exec = require('child_process').exec;
const Utils = require('../common/js/utils');

function queryTabList(req, res) {
    exec('ls -lah', function(error, stdout, stderr) {
        const userInfo = [{
            tagName: '手机',
            tagNo: '01',
            orderId: Utils.createOrderId()
        }, {
            tagName: '药房',
            tagNo: '02',
            orderId: Utils.createOrderId()
        }, {
            tagName: '商城',
            tagNo: '03',
            orderId: Utils.createOrderId()
        }, {
            tagName: '购物',
            tagNo: '04',
            orderId: Utils.createOrderId()
        }, {
            tagName: '母婴',
            tagNo: '05',
            orderId: Utils.createOrderId()
        }]
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.write(stdout);
        res.write(JSON.stringify(userInfo));
        res.end();
    });
}

exports.queryTabList = queryTabList;