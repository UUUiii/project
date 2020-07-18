Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    loadpiclist:'',
    imglist:'',
    shopinfolist:'',
    isshowlayer:false,
    typelist:'',
    currspelist:{},
    num:0
  },
  //获取预览图片
  getpic:function(){
    let that=this
    // console.log(that.data.id)
    wx.request({
      url: 'http://localhost:3000/getloadpic?',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      data:{
        proid:that.data.id
      },
      success:function(res){
        that.setData({
          loadpiclist:res.data.list
        })
        let imglist=new Array()
        for(var i=0;i<that.data.loadpiclist.length;i++){
          imglist.push(that.data.loadpiclist[i].pimgsrc)
        }
        that.setData({
          imglist:imglist
        })
      },
      fail:function(){
        console.log('图片查询失败')
      }
    })
  },
  //预览图片放大
  preview(e){
    let that=this;
    // console.log(that.data.imglist)
    wx.previewImage({
      urls:that.data.imglist,
      current:e.currentTarget.dataset.src
    })
  },
  //获取商品信息
  getshopinfo(){
    let that=this
    // console.log(that.data.id)
    wx.request({
      url: 'http://localhost:3000/getshopinfo?',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      data:{
        id:that.data.id
      },
      success:function(res){
        that.setData({
          shopinfolist:res.data.list
        })
        // console.log(that.data.shopinfolist)
      },
      fail:function(){
        console.log('图片查询失败')
      }
    })
  },
   //加减数量
   add(e){
    this.data.num++
     this.setData({
      num:this.data.num
     })
  },
  minus(e){
    this.data.num--
     if(this.data.num<1){
      this.data.num=1
     }
     this.setData({
      num:this.data.num
     })
  },
  //立即购买
  buyspe(){
    let that=this;
    let sinfo=wx.getStorageSync('userinfo')
    that.data.ocnum=this.createnum()
    shopnum:wx.setStorageSync('shopnum', that.data.ocnum)
    wx.request({
      url: 'http://localhost:3000/addordershop?',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      data:{
        openid:sinfo.openid,
        comimgsrc:that.data.shopinfolist[0].comimgsrc,
        comname:that.data.shopinfolist[0].comname,
        num:that.data.num,
        price:that.data.currspelist.price*that.data.num,
        number:that.data.ocnum,
        specification:that.data.currspelist.tname
      },
      success:function(res){
        that.data.totelprice=0
      },
          fail:function(){
            console.log(0)
          }
        })
    wx.navigateTo({
      url: '/pages/shop/clearshop/shoporder',
    })

  },

  //加入购物车
  addshop(){
    let that=this;
    let info=wx.getStorageSync('userinfo')
    wx.request({
      url: 'http://localhost:3000/addshop?',
      data:{
        id:that.data.id,
        openid:info.openid,
        checked:0,
        comimgsrc:that.data.shopinfolist[0].comimgsrc,
        comname:that.data.shopinfolist[0].comname,
        num:1,
        price:that.data.shopinfolist[0].price,
        specification:'默认'
      },
      header: {
       'content-type': 'application/json' // 默认值
     },
     method:"get",
      success:function(res){
       wx.showToast({
         title: '已加入购物车',
       })
      },
      fail:function(){
       wx.showToast({
               icon: 'none',
               title: '重复购买'
             })
             // console.error('[数据库] [查询记录] 失败：', err)
           }
         })
  },
  //收藏
  collect(){
    wx.showToast({
      title: '该功能未开放',
    })
  },  
  //购买规格弹窗
  Popups(){
    let that=this;
    that.setData({
      isshowlayer:true
    })
    wx.request({
      url: 'http://localhost:3000/getsprcification?',
      data:{
        tid:that.data.id,
      },
      header: {
       'content-type': 'application/json' // 默认值
     },
     method:"get",
     success:function(res){
      that.setData({
        typelist:res.data.list,
        currspelist:res.data.list[0]
      })
     },
     fail:function(){
       console.log("查询规格失败")
     }
    })
  },
  close(){
    let that=this;
    that.setData({
      isshowlayer:false
    })
  },
  //规格选择器
  setspe(e){
    let that=this;
    let obj=that.data.typelist.find(r=>r.id===e.currentTarget.dataset.id)
    that.setData({
      currspelist:obj
    })
  },
 //订单编号
 createnum:function(){
  let now = new Date();
  let year = now.getFullYear();       //年
  let month = now.getMonth() + 1;     //月
  let day = now.getDate();            //日
  let hh = now.getHours();            //时
  let mm = now.getMinutes();          //分
  let ss = now.getSeconds();           //秒
  let clock = year + "";
  if(month < 10)
      clock += "0";

  clock += month + "";

  if(day < 10)
      clock += "0";

  clock += day + "";

  if(hh < 10)
      clock += "0";

  clock += hh + "";
  if(mm < 10) clock += '0';
  clock += mm + "";

  if(ss < 10) clock += '0';
  clock += ss;

  clock+=parseInt(Math.random() * 9000 + 1000);
  return(clock);
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.data.id=options.id;
    this.getpic();
    this.getshopinfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})