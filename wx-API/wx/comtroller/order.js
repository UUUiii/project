var dbconfig = require('../util/dbconflg')
    //订单
getorder = (req, res) => {
        let { openid } = req.query;
        var sql = 'select * from orders where openid=?';
        var sqlArr = [openid];
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
    //订单列表
getorderlist = (req, res) => {
    let { orderstatus, openid } = req.query;
    var sql = 'select * from orders where orderstatus=? and openid=?';
    var sqlArr = [orderstatus, openid]
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

//全部订单号商品列表
getallorderlist = (req, res) => {
    let { ordernumber, openid } = req.query;
    var sql = 'select * from orders where ordernumber=? and openid=?';
    var sqlArr = [ordernumber, openid]
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
                // console.log(sqlArr)
        } else {
            //返回数据
            res.send({
                    data
                })
                // console.log(sqlArr)
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//订单号查询
getordernum = (req, res) => {
    let { orderstatus, openid } = req.query;
    var sql = "select ordernumber from orders where orderstatus=? and openid=?";
    var sqlArr = [orderstatus, openid];
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

// 地址
getplace = (req, res) => {
    let { openid } = req.query
    var sql = 'select * from place where openid=?';
    var sqlArr = [openid]
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                    'list': data
                })
                // console.log('调用', sqlArr)
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

addplace = (req, res) => {
    let { openid, username, photo, place, deplace } = req.query;
    var sql = 'insert into place values(null,?,?,?,?,?)';
    var sqlArr = [openid, username, photo, place, deplace]
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


//添加订单
addorder = (req, res) => {
    let { openid, ordername, orderstatus, orderprice, ordernumber, orderplace, orderdate, ordernum, orderimgsrc, orderbuyname, message, way, sumprice } = req.query;
    var sql = "insert into orders values(null,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var sqlArr = [openid, ordername, orderstatus, orderprice, ordernumber, orderplace, orderdate, ordernum, orderimgsrc, orderbuyname, message, way, sumprice];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败', sqlArr)
        } else {
            //返回数据
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//分类订单号查询
conshop = (req, res) => {
        let { openid, orderstatus } = req.query;
        var sql = 'select * from orders where  openid=? and orderstatus=?';
        var sqlArr = [openid, orderstatus];
        var callBack = (err, data) => {
            if (err) {
                console.log('查询失败', sqlArr)
            } else {
                //返回数据
                // console.log(sqlArr)
                res.send({
                    'list': data
                })
            }
        }
        dbconfig.sqlConnect(sql, sqlArr, callBack)
    }
    //订单号查询
conshopall = (req, res) => {
    let { ordernumber, openid } = req.query;
    var sql = 'select * from orders where ordernumber=? and openid=?';
    var sqlArr = [ordernumber, openid];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败', sqlArr)
        } else {
            //返回数据
            // console.log(sqlArr)
            res.send({
                'list': data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//修改订单状态
module.exports = {
    getorder,
    getorderlist,
    getplace,
    addplace,
    addorder,
    getordernum,
    conshop,
    conshopall,
    getallorderlist
}