var dbconfig = require('../util/dbconflg')
    // 登录验证

//账号注册
resiger = (req, res) => {
    let {
        openid,
        counterphoto,
        password
    } = req.query;
    var sql = 'insert into counters values(null,?,?,?)';
    var sqlArr = [openid, counterphoto, password];
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

//验证
loginserver = (req, res) => {
    let {
        counterphoto,
        password
    } = req.query
    var sql = 'select * from counters where counterphoto=? and password=?';
    var sqlArr = [counterphoto, password];
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

//密码修改
uppass = (req, res) => {
    let {
        password,
        counterphoto
    } = req.query;
    var sql = 'update counters set password=? where counterphoto=?';
    var sqlArr = [password, counterphoto];
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

//后台登录验证
backstagelogin = (req, res) => {
    var sql = "select * from admin ";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('查询失败')
        } else {
            //返回数据
            res.send({
                data
            })

        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

//后台密码修改
module.exports = {
    resiger,
    loginserver,
    uppass,
    backstagelogin
}