const path = require('path');
const os = require("os");
const networkInterfaces = os.networkInterfaces();
let host = '';
if (networkInterfaces['en0']) {
    host = networkInterfaces['en0'][1].address;
} else {
    host = networkInterfaces['WLAN'][1].address;
}
module.exports = {
    build: {
        // env: require('./prod.env'),
        // index: path.resolve(__dirname, '../dist/main.html'),
        // assetsRoot: path.resolve(__dirname, '../dist'),
        // assetsSubDirectory: 'static',
        // assetsPublicPath: './',
        // productionSourceMap: true,
        // productionGzip: false,
        // productionGzipExtensions: ['js', 'css']
    },
    dev: {
        host: host,
        port: 8888
    },
    // 数据库地址
    // mongod --dbpath C:\MongoDB\data\db
    DB_URL: 'mongodb://localhost:27017/chaofan',
    // 接口请求方式配置
    methods: {
        '/getUserInfo': {
            method: 'post'
        },
        '/queryTabList': {
            method: 'get'
        },
        '/queryPunchInRule': {
            method: 'post'
        },
        '/csdnCheck': {
            method: 'get'
        },
        '/login': {
            method: 'post'
        },
        '/queryPersonnelList': {
            method: 'post'
        },
        '/changePersonnelList': { // 新增 || 修改 || 删除
            method: 'post'
        }
    }
};