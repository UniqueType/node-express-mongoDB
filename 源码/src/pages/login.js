const querystring = require('querystring');
const exec = require('child_process').exec;
const MongoClient = require('mongodb').MongoClient;
const formatDate = require('../common/js/formatDate');
const DB_URL = require('../../config/config').DB_URL;


const login = (req, res) => {
    exec('ls -lah', function(error, stdout, stderr) {
        let params = '';
        const resData = {
            success: false,
            errorCode: null,
            errorMsg: null,
            result: null
        };
        req.on('data', function(chunk) {
            params += chunk;
        });
        req.on('end', function() {
            params = querystring.parse(params);
            if (!params.mobile) {
                resData.errorCode = 'API00001';
                resData.errorMsg = '手机号不能为空或格式不正确';
            } else if (!params.vcode) {
                resData.errorCode = 'API00002';
                resData.errorMsg = '验证码不能为空';
            } else {
                resData.result = {
                    mobile: params.mobile,
                    vcode: params.vcode
                }
                connectDB(function(db_err, db) {
                    if (db_err) {
                        res.writeHead(500, { 'Content-Type': 'application/json;charset=utf8' });
                        res.write(JSON.stringify('数据库连接失败'));
                        res.end();
                        return;
                    }
                    // 老用户查询
                    queryUserInfo(db, resData.result, function(resp) {
                        console.log('-------queryUserInfo-------')
                        console.log(resp);
                        if (!resp || resp.length < 1) {
                            insertUserlist(db, resData.result, function(err1, resp1) {
                                console.log('-------insertUserlist-------')
                                if (err1 || !resp1.result.n) {
                                    console.log('插入数据失败');
                                    resData.errorCode = 'API00003';
                                    resData.errorMsg = '新增数据失败';
                                    resData.result = null;
                                } else {
                                    console.log('新增数据成功');
                                    resData.success = true;
                                }
                                res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' });
                                res.write(JSON.stringify(resData));
                                res.end();
                                db.close();
                            });
                        } else {
                            resData.success = true;
                            res.writeHead(200, {'Content-Type': 'application/json;charset=utf8'});
                            res.write(JSON.stringify(resData));
                            res.end();
                            db.close();
                        }
                    });
                });
            }
        });
    });

}
// 老用户查询
const queryUserInfo = (db, data, callback) => {
    const chaofan = db.db('chaofan');
    chaofan.collection('userList').find({ 'mobile': data.mobile }).toArray(function(err, res) {
        // console.log(err)
        callback(res);
    });
}
// 向数据库插入数据 // 新用户入库
const insertUserlist = (db, data, callback) => {
    data.addTime = formatDate.getYYYYMMDDHHMMSS();
    const chaofan = db.db('chaofan');
    chaofan.collection('userList').insertOne(data, function(error, result) {
        callback(error, result);
    });
}

// 连接数据库
const connectDB = (callback) => {
    MongoClient.connect(DB_URL, function(err, db) {
        callback(err, db);
    });
}
exports.login = login;