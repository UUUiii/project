const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true // 多语句查询
});

module.exports = {
  // getValue(req, res, next) {
  //   var id = req.query.id;
  //   pool.getConnection((err, connection) => {
  //     var sql = sqlMap.getValue;
  //     connection.query(sql, [id], (err, result) => {
  //       res.json(result);
  //       connection.release();
  //     })
  //   })
  // },
  //

  // setValue(req, res, next) {
  //   var id = req.body.id,
  //     name = req.body.name;
  //   pool.getConnection((err, connection) => {
  //     var sql = sqlMap.setValue;

  //     connection.query(sql, [name, id], (err, result) => {
  //       res.json(result);
  //       connection.release();
  //     })
  //   })
  // },
  loginServer(req, res, next) {
    // var username = req.query.username;
    // var password = req.query.password;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.loginServer;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //关键字查询
  serchserver(req, res, next) {
    var aname = "%" + req.body.aname + "%";
    // console.log(aname)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.serchserver;
      connection.query(sql, [aname], (err, result) => {

        res.json(result);
        // console.log(sql);
        // console.log(aname)
        connection.release();
      })
    })
  },
  //用户
  getdata(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getdata;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  delServer(req, res, next) {
    var id = req.body.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delServer;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  updataServer(req, res, next) {
    var id = req.body.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updataServer;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  upadminServer(req, res, next) {
    var id = req.body.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upadminServer;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  forgetServer(req, res, next) {
    var username = req.body.usernum,
      password = req.body.password
    pool.getConnection((err, connection) => {
      var sql = sqlMap.forgetServer;
      connection.query(sql, [password, username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  addServer(req, res, next) {
    var
      usernum = req.body.usernum,
      username = req.body.username,
      password = req.body.password,
      ident = req.body.ident,
      sex = req.body.sex,
      telephoto = req.body.telephoto,
      emali = req.body.emali,
      usernum = req.body.usernum,
      token = req.body.token;
    cenreg = req.body.cenreg;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addServer;
      connection.query(sql, [usernum, username, ident, password, sex, telephoto, emali, token, cenreg], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  regsiter(req, res, next) {
    var
      usernum = req.body.usernum,
      username = req.body.username,
      password = req.body.password,
      sex = req.body.sex,
      telphoto = req.body.telphoto,
      emali = req.body.emali,
      token = req.body.token;
    cenreg = req.body.cenreg;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.regsiter;
      connection.query(sql, [usernum, username, password, sex, telphoto, emali, token, cenreg], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  rulename(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.rulename;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //企业
  selectculture(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectculture;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  selculimg(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selculimg;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  addculture(req, res, next) {
    var title = req.body.title,
      imgpath = req.body.imgpath,
      concent = req.body.concent,
      weight = req.body.weight
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addculture;
      connection.query(sql, [title, imgpath, concent, weight], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //   setimg(req, res, next) {
  //     var
  //       fileDownloadUri = req.body.filepath
  //     // console.log(fileDownloadUri)
  //     pool.getConnection((err, connection) => {
  //       var sql = sqlMap.setimg;
  //       connection.query(sql, [fileDownloadUri], (err, result) => {
  //         res.json(result);
  //         connection.release();
  //       })
  //     })
  //   },
  upculture(req, res, next) {
    var culid = req.body.culid
    title = req.body.title,
      imgpath = req.body.imgpath,
      concent = req.body.concent,
      weight = req.body.weight
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upculture;
      connection.query(sql, [title, imgpath, concent, weight, culid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  delculture(req, res, next) {
    var culid = req.body.culid
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delculture;
      connection.query(sql, [culid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //活动

  getaname(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getaname;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  selectactive(req, res, next) {
    var aid = req.body.aid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectactive;
      connection.query(sql, [aid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  addactiveServer(req, res, next) {
    var
      aname = req.body.aname,
      aplace = req.body.aplace,
      award = req.body.award,
      aorganman = req.body.aorganman,
      expenditure = req.body.expenditure,
      aconcent = req.body.concent,
      activedatestart = req.body.activedatestart,
      activedateend = req.body.activedateend,
      matnatt = req.body.matnatt
    activetype = req.body.activetype
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addactiveServer;
      connection.query(sql, [aname, aplace, aconcent, matnatt, award, aorganman, expenditure, activedatestart, activedateend, activetype], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  upactiveServer(req, res, next) {
    var
      aid = req.body.aid,
      aname = req.body.aname,
      aplace = req.body.aplace,
      award = req.body.award,
      aorganman = req.body.aorganman,
      expenditure = req.body.expenditure,
      aconcent = req.body.aconcent,
      activedatestart = req.body.activedatestart,
      activedateend = req.body.activedateend,
      matnatt = req.body.matnatt,
      activetype = req.body.activetype
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upactiveServer;
      connection.query(sql, [aname, aplace, aconcent, matnatt, award, aorganman, expenditure, activedatestart, activedateend, activetype, aid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  delactive(req, res, next) {
    var aid = req.body.aid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delactive;
      connection.query(sql, [aid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getactive(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getactive;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getinfrom(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getinfrom;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  //福利
  getaward(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getaward;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  selectmyward(req, res, next) {
    var username = req.body.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectmyward;
      connection.query(sql, [username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  delwardServer(req, res, next) {
    var wid = req.body.wid;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delwardServer;
      connection.query(sql, [wid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  upwardServer(req, res, next) {
    var
      wid = req.body.wid,
      wconcent = req.body.wconcent,
      wrequire = req.body.wrequire
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upwardServer;
      connection.query(sql, [wconcent, wrequire, wid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  addawardServer(req, res, next) {
    var
      wconcent = req.body.wconcent,
      wrequire = req.body.wrequire
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addawardServer;
      connection.query(sql, [wconcent, wrequire], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  //成员
  getuserinfo(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getuserinfo;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getward(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getward;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  getuser(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getuser;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  upuserinfo(req, res, next) {
    var
      uid = req.body.uid;
    username = req.body.username;
    awardinfo = req.body.awardinfo;
    status = req.body.status;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upuserinfo;
      connection.query(sql, [username, awardinfo, status, uid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  deluserinfo(req, res, next) {
    var
      uid = req.body.uid
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deluserinfo;
      connection.query(sql, [uid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  adduserinfo(req, res, next) {
    var
      username = req.body.username;
    awardinfo = req.body.awardinfo;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.adduserinfo;
      connection.query(sql, [username, awardinfo], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //消费资金
  getcapital(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getcapital;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  upcapital(req, res, next) {
    var
      fid = req.body.fid;
    activename = req.body.activename;
    aexpenditrue = req.body.aexpenditrue;
    pexpenditrue = req.body.pexpenditrue;
    wexpenditrue = req.body.wexpenditrue;
    awexpenditrue = req.body.awexpenditrue;
    activetime = req.body.activetime;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upcapital;
      connection.query(sql, [activename, aexpenditrue, pexpenditrue, wexpenditrue, awexpenditrue, activetime, fid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  delcapital(req, res, next) {
    var
      fid = req.body.fid
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delcapital;
      connection.query(sql, [fid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  addcapital(req, res, next) {
    var
      activename = req.body.activename;
    aexpenditrue = req.body.aexpenditrue;
    pexpenditrue = req.body.pexpenditrue;
    wexpenditrue = req.body.wexpenditrue;
    awexpenditrue = req.body.awexpenditrue;
    activetime = req.body.activetime;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addcapital;
      connection.query(sql, [activename, aexpenditrue, pexpenditrue, wexpenditrue, awexpenditrue, activetime], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  //收入资金
  getincome(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getincome;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  upincome(req, res, next) {
    var
      cid = req.body.cid;
    admissions = req.body.admissions;
    aidcost = req.body.aidcost;
    costinput = req.body.costinput;
    incomedate = req.body.incomedate;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upincome;
      connection.query(sql, [admissions, aidcost, costinput, incomedate, cid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  delincome(req, res, next) {
    var
      cid = req.body.cid
    pool.getConnection((err, connection) => {
      var sql = sqlMap.delincome;
      connection.query(sql, [cid], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  addincome(req, res, next) {
    var
      admissions = req.body.admissions;
    aidcost = req.body.aidcost;
    costinput = req.body.costinput;
    incomedate = req.body.incomedate
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addincome;
      connection.query(sql, [admissions, aidcost, costinput, incomedate], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },


  //活动申请
  getreq(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getreq;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getuserreq(req, res, next) {
    var rusername = req.body.rulename;
    // console.log(req.body.rulename)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getuserreq;
      connection.query(sql, [rusername], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  upreq(req, res, next) {
    var
      rcode = req.body.rcode;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upreq;
      connection.query(sql, [rcode], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  unupreq(req, res, next) {
    var
      rcode = req.body.rcode;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upreq;
      connection.query(sql, [rcode], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  addreq(req, res, next) {
    var
      rname = req.body.rname;
    rusername = req.body.rusername;
    rconcent = req.body.rconcent;
    rcode = req.body.rcode;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addreq;
      connection.query(sql, [rname, rusername, rconcent, rcode], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //福利申请
  getreqward(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getreqward;
      connection.query(sql, (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //申请福利
  getwardreq(req, res, next) {
    var rwusername = req.body.rwusername;
    // console.log(req.body.rwusername)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getwardreq;
      connection.query(sql, [rwusername], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getmyinfo(req, res, next) {
    var
      username = req.body.username
    console.log(req.body.username)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getmyinfo;
      connection.query(sql, [username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  // verify(req, res, next) {
  //   var
  //     username = req.body.username
  //   awardinfo = req.body.awardinfo
  //   // console.log(req.body.rwname)
  //   pool.getConnection((err, connection) => {
  //     var sql = sqlMap.verify;
  //     connection.query(sql, [username, awardinfo], (err, result) => {
  //       res.json(result);
  //       connection.release();
  //     })
  //   })
  // },


  upreqward(req, res, next) {
    var
      wcode = req.body.wcode;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upreqward;
      connection.query(sql, [wcode], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  addreqward(req, res, next) {
    var
      rwname = req.body.rwname;
    rwusername = req.body.rwusername;
    rwconcent = req.body.rwconcent;
    wcode = req.body.wcode;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addreqward;
      connection.query(sql, [rwname, rwusername, rwconcent, wcode], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  //个人信息
  upmyinfo(req, res, next) {
    var
      id = req.body.id;
    username = req.body.username;
    telphoto = req.body.telphoto;
    emali = req.body.emali;
    sex = req.body.sex;
    password = req.body.password,
      cenreg = req.body.cenreg;
    token = req.body.token;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.upmyinfo;
      connection.query(sql, [username, password, telphoto, sex, emali, token, cenreg, id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  selectmyinfo(req, res, next) {
    var uname = req.body.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectmyinfo;
      connection.query(sql, [uname], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
}
