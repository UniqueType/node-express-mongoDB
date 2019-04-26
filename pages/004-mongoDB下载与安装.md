## mongoDB下载与安装 + 可视化工具
1. 官网下载直接安装在顶层目录
2. mongoDB数据库配置--例如: 安装目录是C:\MongoDB\
3. 在mongoDB目录下data文件夹下新建db文件夹及log文件夹，log文件夹下再创建一个mongodb.log文件
4. 打开cmd 运行mongod --dbpath C:\MongoDB\data\db命令 （数据库待连接）
5. 运行项目，连接数据库，并执行增删改查操作

## mongoDB常用基本操作命令
```
db的帮助文档
输入：db.help();
db.AddUser(username,password[, readOnly=false])  添加用户
db.auth(usrename,password)     设置数据库连接验证
db.cloneDataBase(fromhost)     从目标服务器克隆一个数据库
db.commandHelp(name)       returns the help for the command
db.copyDatabase(fromdb,todb,fromhost)  复制数据库fromdb---源数据库名称，todb---目标数据库名称，fromhost---源数据库服务器地址
db.createCollection(name,{size:3333,capped:333,max:88888})  创建一个数据集，相当于一个表
db.currentOp()                 取消当前库的当前操作
db.dropDataBase()              删除当前数据库
db.eval(func,args)             run code server-side
db.getCollection(cname)        取得一个数据集合，同用法：db['cname'] or
db.getCollenctionNames()       取得所有数据集合的名称列表
db.getLastError()              返回最后一个错误的提示消息
db.getLastErrorObj()           返回最后一个错误的对象
db.getMongo()                  取得当前服务器的连接对象get the server
db.getMondo().setSlaveOk()     allow this connection to read from then nonmaster membr of a replica pair
db.getName()                   返回当操作数据库的名称
db.getPrevError()              返回上一个错误对象
db.getProfilingLevel()         获取profile level
db.getReplicationInfo()        获得重复的数据
db.getSisterDB(name)           get the db at the same server as this onew
db.killOp()                    停止（杀死）在当前库的当前操作
db.printCollectionStats()      返回当前库的数据集状态
db.printReplicationInfo()        打印主数据库的复制状态信息
db.printSlaveReplicationInfo()        打印从数据库的复制状态信息
db.printShardingStatus()       返回当前数据库是否为共享数据库
db.removeUser(username)        删除用户
db.repairDatabase()            修复当前数据库
db.resetError()
db.runCommand(cmdObj)          run a database command. if cmdObj is a string, turns it into {cmdObj:1}
db.setProfilingLevel(level)    设置profile level 0=off,1=slow,2=all
db.shutdownServer()            关闭当前服务程序
db.stats()                       返回当前数据库的状态信息
db.version()                   返回当前程序的版本信息

表的帮助，格式：db.表名.help()
db.test.find({id:10})          返回test数据集ID=10的数据集
db.test.find({id:10}).count()  返回test数据集ID=10的数据总数
db.test.find({id:10}).limit(2) 返回test数据集ID=10的数据集从第二条开始的数据集
db.test.find({id:10}).skip(8)  返回test数据集ID=10的数据集从0到第八条的数据集
db.test.find({id:10}).limit(2).skip(8)  返回test数据集ID=1=的数据集从第二条到第八条的数据
db.test.find({id:10}).sort()   返回test数据集ID=10的排序数据集
db.test.findOne([query])       返回符合条件的一条数据
db.test.getDB()                返回此数据集所属的数据库名称
db.test.getIndexes()           返回些数据集的索引信息
db.test.group({key:...,initial:...,reduce:...[,cond:...]})    返回分组信息
db.test.mapReduce(mayFunction,reduceFunction,<optional params>)  这个有点像存储过程
db.test.remove(query)                      在数据集中删除一条数据
db.test.renameCollection(newName)          重命名些数据集名称
db.test.save(obj)                          往数据集中插入一条数据
db.test.stats()                            返回此数据集的状态
db.test.storageSize()                      返回此数据集的存储大小
db.test.totalIndexSize()                   返回此数据集的索引文件大小
db.test.totalSize()                        返回些数据集的总大小
db.test.update(query,object[,upsert_bool]) 在此数据集中更新一条数据
db.test.validate()                         验证此数据集
db.test.getShardVersion()                  返回数据集共享版本号
```
*[参考链接-mongoDB数据表基本操作指令](http://www.cnblogs.com/libingql/archive/2011/06/09/2076440.html)

## 可视化工具安装
[MongoDB可视化工具 (Robo 3T)](https://robomongo.org/)

1. 安装后创建连接（前提是数据库启动）
2. 操作库手动增删改查





