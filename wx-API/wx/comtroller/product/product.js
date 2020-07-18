//商品
var dbconfig = require('../../util/dbconflg')
getproduct = (req, res) => {
    var sql = 'select * from product';
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

// 商品件数
upnum = (req, res) => {
    let { comnum, comname } = req.query;
    var sql = "update product set comnum=comnum-? where comname=?";
    var sqlArr = [comnum, comname];
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



module.exports = {
    getproduct,
    upnum
}