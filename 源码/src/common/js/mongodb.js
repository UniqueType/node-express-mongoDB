const MongoClient = require('mongodb').MongoClient;
const DB_URL = require('../../../config/config').DB_URL;
const formatDate = require('./formatDate');
// 连接数据库
const connectDB = (callback) => {
    MongoClient.connect(DB_URL, function(err, db) {
        if (err) throw err;
        callback(err, db);
    });
};

// 查询
const query = (libName, tableName, queryCondition, callback) => {
    connectDB(function(connectError, db) {
        const chaofan = db.db(libName);
        chaofan.collection(tableName).find(queryCondition).toArray(function(err, res) {
            if (err) throw err;
            callback(res);
            db.close();
        });
    });
};

// 查询最大索引值
const queryMaxIndex = (chaofan, callback) => {
    chaofan.find({}).sort({ '_id': -1 }).toArray(function(err, res) {
        if (err) throw err;
        const index = res.length > 0 ? res[0]._id : -1;
        callback(index);
    });
};

// 向数据库插入一条数据
const insertOne = (libName, tableName, newData, callback) => {
    connectDB(function(connectError, db) {
        const chaofan = db.db(libName).collection(tableName);
		queryMaxIndex(chaofan, function(index) {
			newData._id = index + 1;
	        newData.updateTime = formatDate.getYYYYMMDDHHMMSS();
	        chaofan.insertOne(newData, function(err, res) {
	            callback(err, res);
	            db.close();
	        });
		});

    });
};

// 删除一条或多条数据
const deleteMany = (libName, tableName, queryCondition, callback) => {
    connectDB(function(connectError, db) {
        const chaofan = db.db(libName);
        chaofan.collection(tableName).deleteMany(queryCondition, function(err, res) {
            callback(err, res);
            db.close();
        });
    });
};

// 修改一条数据
const editOne = (libName, tableName, queryCondition, newData, callback) => {
    newData.updateTime = formatDate.getYYYYMMDDHHMMSS();
    connectDB(function(connectError, db) {
        const chaofan = db.db(libName);
        const updateStr = { $set: newData };
        chaofan.collection(tableName).updateOne(queryCondition, updateStr, function(err, res) {
            callback(err, res);
            db.close();
        });
    });
};

// 查找&&更新数据
const findAndModify = (libName, tableName, queryCondition, newData, callback) => {
    newData.updateTime = formatDate.getYYYYMMDDHHMMSS();
    connectDB(function(connectError, db) {
        const chaofan = db.db(libName);
        chaofan.collection(tableName).findAndModify(
            queryCondition,
            [], { $set: newData }, { new: true },
            function(err, res) {
                callback(err, res);
                db.close();
            });
    });
};

// db.collection.insertOne():向指定集合中插入一条文档数据
// db.collection.insertMany():向指定集合中插入多条文档数据
module.exports = {
    connectDB,
    query,
    insertOne,
    deleteMany,
    editOne,
    findAndModify
}