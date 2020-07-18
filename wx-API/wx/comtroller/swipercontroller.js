//轮播
var dbconfig = require('../util/dbconflg')
getswiper = (req, res) => {
    var sql = 'select * from swiper';
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
    getswiper
}