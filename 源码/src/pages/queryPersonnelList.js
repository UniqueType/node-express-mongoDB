const exec = require('child_process').exec;
const mongodb = require('../common/js/mongodb');
const Utils = require('../common/js/utils');
const libName = 'chaofan'; // 数据库名称
const tableName = 'personnelList'; // 查询表名称

// 查询员工信息列表
const queryPersonnelList = (req, res) => {
    exec('ls -lah', function() {
        const resData = {
            success: false,
            errorCode: null,
            errorMsg: null,
            result: null
        };
        Utils.getPostParams(req, function(params) {
            mongodb.query(libName, tableName, params || {}, function(queryRes) {
                resData.success = true;
                resData.result = {
                    personnelList: queryRes || []
                };
                Utils.resData(req, res, resData);
            });
        });
    });
}

exports.queryPersonnelList = queryPersonnelList;