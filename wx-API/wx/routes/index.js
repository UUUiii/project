var express = require('express');
var router = express.Router();
var swiper = require('../comtroller/swipercontroller')
var icon = require('../comtroller/icon')
var product = require('../comtroller/product/product')
var selproduct = require('../comtroller/product/selproduct')
var shopgather = require('../comtroller/shopgather')
var logincol = require('../comtroller/login')
var order = require('../comtroller/order')
var type = require('../comtroller/protype')
    /* GET home page. */
    // 轮播
router.get('/getswiper', swiper.getswiper);
// 图标
router.get('/geticon', icon.geticon);
router.get('/getordericon', icon.getordericon)
    // 商品
router.get('/getproduct', product.getproduct);
router.get('/selctpid', selproduct.selctpid);
router.get('/upnum', product.upnum);
// 购物
router.get('/getshop', shopgather.getshop);
router.get('/addshop', shopgather.addshop);
router.get('/delshop', shopgather.delshop);
router.get('/addordershop', shopgather.addordershop)
router.get('/getshopnum', shopgather.getshopnum)
router.get('/delusershop', shopgather.delusershop)
    // 登录注册
router.get('/resiger', logincol.resiger);
router.get('/loginserver', logincol.loginserver);
router.get('/uppass', logincol.uppass);
router.get('/backstagelogin', logincol.backstagelogin);
//订单
router.get('/getorder', order.getorder);
router.get('/getorderlist', order.getorderlist);
router.get('/getplace', order.getplace);
router.get('/addplace', order.addplace);
router.get('/addorder', order.addorder);
router.get('/getordernum', order.getordernum);
router.get('/conshop', order.conshop);
router.get('/conshopall', order.conshopall);
router.get('/getallorderlist', order.getallorderlist);

//分类
router.get('/gettype', type.gettype);
router.get('/getprotype', type.getprotype);
router.get('/getloadpic', type.getloadpic);
router.get('/getshopinfo', type.getshopinfo);
router.get('/getsprcification', type.getsprcification);
module.exports = router