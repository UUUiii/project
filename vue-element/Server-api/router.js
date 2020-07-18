const express = require('express');
const router = express.Router();
const api = require('./api');

//登录
router.get('/loginServer', (req, res, next) => {
  api.loginServer(req, res, next);
});
router.post('/regsiter', (req, res, next) => {
  api.regsiter(req, res, next);
});
router.get('/getdata', (req, res, next) => {
  api.getdata(req, res, next);
});
//用户
router.post('/delServer', (req, res, next) => {
  api.delServer(req, res, next);
});
router.post('/updataServer', (req, res, next) => {
  api.updataServer(req, res, next);
});
router.post('/upadminServer', (req, res, next) => {
  api.upadminServer(req, res, next);
});
router.post('/forgetServer', (req, res, next) => {
  api.forgetServer(req, res, next);
});
router.post('/addServer', (req, res, next) => {
  api.addServer(req, res, next);
});
router.get('/rulename', (req, res, next) => {
  api.rulename(req, res, next);
});
//关键字查询
router.post('/serchserver', (req, res, next) => {
  api.serchserver(req, res, next);
});
//企业
router.get('/selectculture', (req, res, next) => {
  api.selectculture(req, res, next);
});
router.get('/selculimg', (req, res, next) => {
  api.selculimg(req, res, next);
});
router.post('/addculture', (req, res, next) => {
  api.addculture(req, res, next);
});
router.post('/setimg', (req, res, next) => {
  api.setimg(req, res, next);
});
router.post('/upculture', (req, res, next) => {
  api.upculture(req, res, next);
});
router.post('/delculture', (req, res, next) => {
  api.delculture(req, res, next);
});
//活动
router.get('/getactive', (req, res, next) => {
  api.getactive(req, res, next);
});
router.get('/getinfrom', (req, res, next) => {
  api.getinfrom(req, res, next);
});
router.get('/getaname', (req, res, next) => {
  api.getaname(req, res, next);
});
router.post('/addactiveServer', (req, res, next) => {
  api.addactiveServer(req, res, next);
});
router.post('/delactive', (req, res, next) => {
  api.delactive(req, res, next);
});
router.get('/selectactive', (req, res, next) => {
  api.selectactive(req, res, next);
});
router.post('/upactiveServer', (req, res, next) => {
  api.upactiveServer(req, res, next);
});
//福利
router.get('/getaward', (req, res, next) => {
  api.getaward(req, res, next);
});
router.post('/selectmyward', (req, res, next) => {
  api.selectmyward(req, res, next);
});
router.post('/upwardServer', (req, res, next) => {
  api.upwardServer(req, res, next);
});
router.post('/delwardServer', (req, res, next) => {
  api.delwardServer(req, res, next);
});
router.post('/addawardServer', (req, res, next) => {
  api.addawardServer(req, res, next);
});

//成员
router.get('/getuserinfo', (req, res, next) => {
  api.getuserinfo(req, res, next);
});

router.get('/getward', (req, res, next) => {
  api.getward(req, res, next);
});
router.get('/getuser', (req, res, next) => {
  api.getuser(req, res, next);
});
router.post('/upuserinfo', (req, res, next) => {
  api.upuserinfo(req, res, next);
});
router.post('/deluserinfo', (req, res, next) => {
  api.deluserinfo(req, res, next);
});
router.post('/adduserinfo', (req, res, next) => {
  api.adduserinfo(req, res, next);
});

//消费资金
router.get('/getcapital', (req, res, next) => {
  api.getcapital(req, res, next);
});
router.post('/upcapital', (req, res, next) => {
  api.upcapital(req, res, next);
});
router.post('/addcapital', (req, res, next) => {
  api.addcapital(req, res, next);
});
router.post('/delcapital', (req, res, next) => {
  api.delcapital(req, res, next);
});

//收入资金
router.get('/getincome', (req, res, next) => {
  api.getincome(req, res, next);
});
router.post('/upincome', (req, res, next) => {
  api.upincome(req, res, next);
});
router.post('/addincome', (req, res, next) => {
  api.addincome(req, res, next);
});
router.post('/delincome', (req, res, next) => {
  api.delincome(req, res, next);
});
//活动申请
router.get('/getreq', (req, res, next) => {
  api.getreq(req, res, next);
});
router.post('/getuserreq', (req, res, next) => {
  api.getuserreq(req, res, next);
});
router.post('/upreq', (req, res, next) => {
  api.upreq(req, res, next);
});
router.post('/unupreq', (req, res, next) => {
  api.unupreq(req, res, next);
});
router.post('/addreq', (req, res, next) => {
  api.addreq(req, res, next);
});
//福利申请
router.get('/getreqward', (req, res, next) => {
  api.getreqward(req, res, next);
});
router.get('/getmyinfo', (req, res, next) => {
  api.getmyinfo(req, res, next);
});
router.post('/getwardreq', (req, res, next) => {
  api.getwardreq(req, res, next);
});
router.post('/addreqward', (req, res, next) => {
  api.addreqward(req, res, next);
});
router.post('/upreqward', (req, res, next) => {
  api.upreqward(req, res, next);
});
// router.post('/verify', (req, res, next) => {
//   api.verify(req, res, next);
// });
//个人信息
router.post('/selectmyinfo', (req, res, next) => {
  api.selectmyinfo(req, res, next);
});
router.post('/upmyinfo', (req, res, next) => {
  api.upmyinfo(req, res, next);
});
module.exports = router;
