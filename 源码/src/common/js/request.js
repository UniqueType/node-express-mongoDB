const request = require('request');
const requestPost = (url, params, callback) => {
    // application/json
    // application/x-www-form-urlencoded
    // multipart/form-data
    const options = {
        url: url, // req.query
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }, // req.headers
        body: JSON.stringify(params) // req.body
    };
    console.log('post请求url + params===' + JSON.stringify(options));
    request.post(options, function(error, response, body) {
        console.info('response:' + JSON.stringify(response));
        if (error) {
            callback(error);
            return;
        }
        callback(body);
    });
};
const requestGet = (url, callback) => {
    const options = {
        url
    };
    console.log('get请求url===' + JSON.stringify(options));
    request.get(options, function(error, response, body) {
        console.log(typeof response)
        console.info('response:' + typeof response === 'Object'? JSON.stringify(response) : 'undefined');
        if (error) {
            callback(error);
            return;
        }
        callback(body);
    });
}

module.exports = {
    requestPost,
    requestGet
}