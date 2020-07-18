 var sqlMap = {
   getValue: 'SELECT * FROM test WHERE id = ?',
   setValue: 'UPDATE test SET name = ? WHERE id = ?',
   //用户
   loginServer: 'select * from user',
   regsiter: 'INSERT INTO   user  VALUES (null,?,?,0,?,?,?,?,?,?,0)',
   rulename: 'select username from user',
   getdata: 'select * from user',
   delServer: 'DELETE from user WHERE id = ?',
   updataServer: 'UPDATE user set ident=ABS(ident-1) WHERE id =?',
   upadminServer: 'UPDATE user set admission=ABS(admission-1) WHERE id =?',
   addServer: 'INSERT INTO   user  VALUES (null,?,?,?,?,?,?,?,?,?,0)',
   forgetServer: 'update  user set password =?  where username=?',

   //关键字查询
   serchserver: "select * from active where aname  like ? and activetype='活动'",

   //企业文化
   selectculture: "SELECT * FROM `culture`",
   selculimg: 'SELECT * FROM `culture` ORDER BY weight  DESC LIMIT 5',
   delculture: 'DELETE from culture WHERE culid = ?',
   upculture: 'update culture set title=?,imgpath=?,concent=?,weight=? where culid=?',
   addculture: 'insert into culture values(null,?,?,?,?)',
   setimg: 'insert into pic values(?)',
   //活动
   getactive: "select * from active where activetype='活动'",
   getinfrom: "select * from active where activetype='通知'",
   getaname: "select aname from active where activetype='活动'",
   delactive: 'DELETE from active WHERE aid = ?',
   addactiveServer: 'insert into active values(null,?,?,?,?,?,?,?,?,?,?)',
   selectactive: 'select * from active where aid=?',
   upactiveServer: 'update active set aname=?,aplace=?,acontent=?,matnatt=?,award=?,aorganman=?,expenditure=?,activedatestart=?,activedateend=?,activetype=? where aid=?',
   //福利
   getaward: 'select * from ward',
   addawardServer: 'insert into ward values(null,?,?)',
   delwardServer: 'delete from ward where wid=?',
   upwardServer: 'update ward set wconcent=?,wrequire=? where wid=?',
   selectmyward: 'SELECT awardinfo,status FROM userinfo WHERE username=?',
   //成员信息
   getuserinfo: 'select * from userinfo',
   getward: "select wconcent from ward",
   getuser: "select username from user",
   upuserinfo: 'update userinfo set username=?,awardinfo=?,status=? where uid=?',
   deluserinfo: 'delete from userinfo where uid=?',
   adduserinfo: 'insert into userinfo values(null,?,?,0)',

   //消费资金
   getcapital: 'select * from fund',
   upcapital: 'update fund set activename=?,aexpenditrue=?,pexpenditrue=?,wexpenditrue=?,awexpenditrue=?,activetime=? where  fid=?',
   addcapital: 'insert into fund values(null,?,?,?,?,?,?)',
   delcapital: 'delete from fund where fid=?',

   //收入资金
   getincome: 'select * from income',
   upincome: 'update income set admissions=?,aidcost=?,costinput=?,incomedate=? where  cid=?',
   addincome: 'insert into income values(null,?,?,?,?)',
   delincome: 'delete from income where cid=?',

   //活动申请
   getreq: 'select * from activereq ',
   getuserreq: 'select * from activereq  where rusername= ?',
   addreq: 'insert into activereq values(null,?,?,?,0)',
   upreq: 'update activereq set rcode=?',
   unupreq: 'update activereq set rcode=?',
   //福利申请
   getreqward: 'select * from wardreq ',
   getwardreq: 'select * from wardreq  where rwusername=?',
   addreqward: 'insert into wardreq values(null,?,?,?,0)',
   getmyinfo: 'select * from userinfo where username=?',
   upreqward: 'update wardreq set wcode=1 ',
   verify: 'SELECT * from userinfo WHERE username =? and awardinfo=?',
   //个人信息
   selectmyinfo: 'SELECT * FROM user WHERE username=?',
   upmyinfo: 'update user set username=?,password=?,telphoto=?,sex=?,emali=?,token=?,cenreg=? where id=?'
 }

 module.exports = sqlMap;
