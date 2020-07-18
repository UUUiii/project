//图标
var dbconfig = require('../util/dbconflg')
    //首页图标
geticon = (req, res) => {
    var sql = "select * from icon where code='首页'";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 订单图标
getordericon = (req, res) => {
    var sql = "select * from icon where code='订单'";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {
    geticon,
    getordericon
}