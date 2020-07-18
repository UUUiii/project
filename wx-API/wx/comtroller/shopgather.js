//购物车
var dbconfig = require('../util/dbconflg')

//获取购物车列表
getshop = (req, res) => {
    var sql = 'select * from shopgather';
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

// 获取指定商品
getshopnum = (req, res) => {
    let { number } = req.query;
    var sql = 'select * from shopgather where number=?';
    var sqlArr = [number];
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



//添加商品
addshop = (req, res) => {
    let { id, openid, checked, comimgsrc, comname, num, price, specification } = req.query;
    var sql = 'INSERT INTO shopgather VALUES (?,?,?,?,?,?,?,?) ';
    var sqlArr = [id, openid, checked, comimgsrc, comname, num, price, specification];
    var callBack = (err, data) => {
        if (err) {
            console.log('商品添加失败')
                // console.log(sqlArr)
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//添加商品编号
addordershop = (req, res) => {
    let { openid, comimgsrc, comname, num, price, number, specification } = req.query;
    var sql = 'insert into ordershop values(null,?,?,?,?,?,?,?)';
    var sqlArr = [openid, comimgsrc, comname, num, price, number, specification];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
                // console.log(sqlArr)
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 获取单号列表商品
getshopnum = (req, res) => {
        let { number } = req.query;
        var sql = 'select * FROM ordershop where number=?';
        var sqlArr = [number];
        var callBack = (err, data) => {
            if (err) {
                console.log('查询失败')
                    // console.log(sqlArr)
            } else {
                //返回数据
                res.send({
                    'list': data
                })
            }
        }
        dbconfig.sqlConnect(sql, sqlArr, callBack)
    }
    // 删除商品
delshop = (req, res) => {
    let { id } = req.query;
    var sql = 'delete FROM shopgather where id=?';
    var sqlArr = [id];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
                // console.log(sqlArr)
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}


// 删除用户选择商品
delusershop = (req, res) => {
    let { openid } = req.query;
    var sql = 'delete FROM shopgather where openid=?';
    var sqlArr = [openid];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
                // console.log(sqlArr)
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
    getshop,
    addshop,
    delshop,
    addordershop,
    getshopnum,
    delusershop
}