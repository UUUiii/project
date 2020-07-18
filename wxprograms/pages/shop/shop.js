// pages/shop/shop.js
Page({  
  //全选
  selectall(){
    this.data.isSelectAll=!this.data.isSelectAll;
    this.data.shoplist.forEach(r=>{
      r.checked=this.data.isSelectAll
    })
    this.setData({
      shoplist:this.data.shoplist,
      isSelectAll:this.data.isSelectAll
    })
    this.calctotelprice()
  },
  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    totelprice:0,
    iscolor:true,
    isSelectAll:false,
    id:'',
    openid:'',
    shoplist:'',
    number:'',
    ocnum:''
  },

  //加减价格
  calctotelprice(){
    let totelprice=0;
     this.data.shoplist.forEach(r=>{
       if(r.checked){
         totelprice+=r.num*r.price
       }
     })
 
     this.setData({
       totelprice
     })
   },


//删除
delshop:function(e){
  wx.request({
    url: 'http://localhost:3000/delshop?',
    data:{
      id:e.currentTarget.dataset.id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method:"get",
    success:function(res){
      wx.showToast({
        title: '删除成功',
      })
      wx.reLaunch({
        url: '/pages/shop/shop',
      })
    },
    fail:function(){
      console.log("删除失败",res)
    }
  })
},


  //加减数量
  add(e){
    let id=e.currentTarget.dataset.id
    let anum=this.data.shoplist.find(function (item){
      return item.id===id
     })
    anum.num++
     this.setData({
      shoplist:this.data.shoplist
     })
     this.calctotelprice()
  },
  minus(e){
    let id=e.currentTarget.dataset.id
    let anum=this.data.shoplist.find(function (item){
      return item.id===id
     })
     anum.num--
     if(anum.num<1){
       anum.num=1
     }
     this.setData({
      shoplist:this.data.shoplist
     })
     this.calctotelprice()
  },
  //图标状态
  select(e){
    let id=e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset.id)
   let shops=this.data.shoplist.find(r=>r.id===id
   )
    // console.log(shops)
  //  console.log(this.data.shoplist)
   shops.checked=!shops.checked

   let isSelectAll=this.data.shoplist.every(r=>r.checked)

   this.setData({
     shoplist:this.data.shoplist,
     isSelectAll
   })
   this.calctotelprice()
  },
  //获购物 
  getshop:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:3000/getshop',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      success:function(res){
        that.setData({
          shoplist:res.data.list,
        })
        // console.log(that.data.shoplist)

      }
    })
  },
  // 结算
  orderplace:function(){
    let that=this;
    let sinfo=wx.getStorageSync('userinfo')
    that.data.ocnum=this.createnum()
    shopnum:wx.setStorageSync('shopnum', that.data.ocnum)
    for(var i=0;i<that.data.shoplist.length;i++){
      if(that.data.shoplist[i].checked==true){
        // console.log(that.data.shoplist.length)
        wx.request({
          url: 'http://localhost:3000/addordershop?',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      data:{
        openid:sinfo.openid,
        comimgsrc:that.data.shoplist[i].comimgsrc,
        comname:that.data.shoplist[i].comname,
        num:that.data.shoplist[i].num,
        price:that.data.shoplist[i].price*that.data.shoplist[i].num,
        number:that.data.ocnum,
        specification:'默认'
      },
      success:function(res){
        that.data.totelprice=0
      },
          fail:function(){
            console.log(0)
          }
        })
      }
    }
    wx.navigateTo({
      url: '/pages/shop/clearshop/shoporder',
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
   this.getshop();
  //  this.calctotelprice();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getshop()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getshop()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.getshop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.getshop()
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