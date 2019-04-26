const exec = require('child_process').exec;
const ObjectId = require('mongodb').ObjectID;
const mongodb = require('../common/js/mongodb');
const Utils = require('../common/js/utils');
const libName = 'chaofan'; // 数据库名称
const tableName = 'personnelList'; // 查询表名称

// 查询员工信息列表
const changePersonnelList = (req, res) => {
    exec('ls -lah', function() {
        const resData = {
            success: false,
            errorCode: null,
            errorMsg: null,
            result: null
        };
        Utils.getPostParams(req, function(params) {
            if (params && !params.actionType) {
                resData.errorCode = 'API000013';
                resData.errorMsg = '请求参数actionType不存在';
                Utils.resData(req, res, resData);
                return;
            }
            if (params && params.actionType === 'add') {
        		if (!params.userName) {
                    resData.errorCode = 'API000014';
                    resData.errorMsg = '请求参数userName不能为空';
                    Utils.resData(req, res, resData);
                    return;
        		} else if (!params.userNo) {
        			resData.errorCode = 'API000015';
                    resData.errorMsg = '请求参数userNo不能为空';
                    Utils.resData(req, res, resData);
                    return;
        		}
                const queryCondition = {
                    'userName': params.userName,
                    'userNo': params.userNo
                }
                mongodb.query(libName, tableName, queryCondition, function(queryRes) {
                    if (queryRes && queryRes.length < 1) {
                        params.userId = Utils.createUUID(32, 16);
                        // params._id = Utils.createUUID(32, 16);
                        addData(params, function(addErr, addRes) {
                            if (addErr) {
                                resData.errorCode = 'API000016';
                                resData.errorMsg = '数据添加失败';
                                Utils.resData(req, res, resData);
                                return;
                            }
                            resData.success = true;
                            resData.result = '数据添加成功';
                            Utils.resData(req, res, resData);
                        });
                    } else {
                        resData.errorCode = 'API000016';
                        resData.errorMsg = '该用户已存在';
                        Utils.resData(req, res, resData);
                    }
                });
            } else if (params.actionType === 'edit') {
                if (!params.userId) {
                    resData.errorCode = 'API0000195';
                    resData.errorMsg = '请求参数userId不能为空';
                    Utils.resData(req, res, resData);
                    return;
                } else if (!params.userName) {
                    resData.errorCode = 'API000014';
                    resData.errorMsg = '请求参数userName不能为空';
                    Utils.resData(req, res, resData);
                    return;
                } else if (!params.userNo) {
                    resData.errorCode = 'API000015';
                    resData.errorMsg = '请求参数userNo不能为空';
                    Utils.resData(req, res, resData);
                    return;
                }
                // 修改数据
                const queryCondition = {
                    'userId': params.userId
                }
                // mongodb.editOne(libName, tableName, queryCondition, params, function(editRes) {
                //     console.log(editRes);
                //     resData.success = true;
                //     resData.result = '数据修改成功';
                //     Utils.resData(req, res, resData);
                // });
                mongodb.findAndModify(libName, tableName, queryCondition, params, function(editErr, editRes) {
                    console.log(editErr, editRes);
                    resData.success = true;
                    resData.result = '数据修改成功';
                    Utils.resData(req, res, resData);
                });
            } else if (params.actionType === 'delete') {
                if (!params.userId) {
                    resData.errorCode = 'API0000195';
                    resData.errorMsg = '请求参数userId不能为空';
                    Utils.resData(req, res, resData);
                    return;
                }
                const queryCondition = {
                    'userId': params.userId
                }
                mongodb.deleteMany(libName, tableName, queryCondition, function(deleteRes) {
                    console.log(deleteRes);
                    resData.success = true;
                    resData.result = '数据删除成功';
                    Utils.resData(req, res, resData);
                });
            }
        });
    });
};

const addData = (params, callback) => {
    console.log(params)
    mongodb.insertOne(libName, tableName, params, function(addErr, addRes) {
        callback(addErr, addRes);
    });
};

exports.changePersonnelList = changePersonnelList;