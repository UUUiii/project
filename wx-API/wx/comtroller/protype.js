//类型
var dbconfig = require('../util/dbconflg')
    //全部分类
gettype = (req, res) => {
    var sql = 'select * from type';
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

//单分类商品
getprotype = (req, res) => {
    let { type } = req.query
    var sql = 'SELECT * FROM type JOIN product on type.typename=product.type WHERE type=? ';
    var sqlArr = [type];
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

//预览图片
getloadpic = (req, res) => {
    let { proid } = req.query;
    var sql = 'SELECT * FROM propic  WHERE proid=? and pictype=1';
    var sqlArr = [proid];
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

//详情信息
getshopinfo = (req, res) => {
    let { id } = req.query;
    var sql = 'SELECT * FROM product  WHERE id=?';
    var sqlArr = [id];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                    'list': data
                })
                // console.log(sqlArr)
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 商品规格
getsprcification = (req, res) => {
    let { tid } = req.query;
    var sql = 'SELECT * FROM specification  WHERE tid=?';
    var sqlArr = [tid];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                    'list': data
                })
                // console.log(sqlArr)
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    gettype,
    getprotype,
    getloadpic,
    getshopinfo,
    getsprcification
}