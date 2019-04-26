const querystring = require('querystring');
const formatDate = require('./formatDate');
// 请求成功，返回请求数据
const resData = (req, res, data) => {
    console.log('http://' + req.headers.host + req.url + '返回数据==' + JSON.stringify(data));
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' });
    res.write(JSON.stringify(data));
    res.end();
};

// 获取post请求参数
const getPostParams = (req, callback) => {
    let params = '';
    req.on('data', function(chunk) {
        params += chunk;
    });
    req.on('end', function() {
        params = querystring.parse(params);
        console.log('http://' + req.headers.host + req.url + '请求参数==' + JSON.stringify(params));
        callback(params);
    });
};

/*
    生成用户id等唯一标识
    len: 生成的长度
    radix: 进制 2 8 10 16
*/
const createUUID = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data. At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

// 根据当前时间戳生成订单号 共26位 14+12=26
const createOrderId = () => {
    // const now = new Date();
    // const year = now.getFullYear();       //年
    // const month = now.getMonth() + 1;     //月
    // const day = now.getDate();            //日
    // const hh = now.getHours();            //时
    // const mm = now.getMinutes();          //分
    // const ss = now.getSeconds();          //秒
    // let orderId = year + '';
    // if(month < 10)
    //     orderId += '0';
    // orderId += month + '';

    // if(day < 10)
    //     orderId += '0';

    // orderId += day + '';

    // if(hh < 10)
    //     orderId += '0';
    // orderId += hh + '';

    // if(mm < 10) 
    //     orderId += '0';
    // orderId += mm + '';

    // if(ss < 10) 
    //     orderId += '0';
    // orderId += ss;
    let orderId = formatDate.getYYYYMMDDHHMMSS('', '');

    let randomNo = '';
    for (let i = 0; i < 12; i++) { // 12位随机数，用以加在时间戳后面。
        randomNo += Math.floor(Math.random() * 10);
    }
    orderId += randomNo
    return(orderId);
};

module.exports = {
    resData,
    getPostParams,
    createUUID,
    createOrderId
}