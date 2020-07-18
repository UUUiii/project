//商品
var dbconfig = require('../../util/dbconflg')
selctpid = (req, res) => {
    let { id } = req.query;
    var sql = "select * from product where id=? ";
    var sqlArr = [id];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败'.err)
        } else {
            //返回数据
            // console.log(_id)
            // console.log(err)
            res.send({
                'list': data

            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    selctpid
}