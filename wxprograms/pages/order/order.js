// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    checked:false,
    checked1:false,
    checked2:false,
    checked3:false,
    checked4:false,
    checked5:false,
    orderlist:[],
    prolist:'',
    numberlist:'',
  },
  getallorder(){
    let that=this;
    let allinfo=wx.getStorageSync('userinfo')
    // console.log(allinfo.openid)
    wx.request({
      url: 'http://localhost:3000/getorder?',
      data:{
        openid:allinfo.openid
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          orderlist:res.data.list
        })
//订单号存储
        let numberlist=new Array();
        if(that.data.orderlist.length==1){
          numberlist.push(that.data.orderlist[0].ordernumber)
        }
        // console.log(that.data.orderlist.length-1)
        else{
      for(let i=0;i<that.data.orderlist.length;i++){
        if(i+1<=that.data.orderlist.length-1){
          // console.log(that.data.orderlist[i].ordernumber!=that.data.orderlist[i+1].ordernumber)
           if(that.data.orderlist[i].ordernumber!=that.data.orderlist[i+1].ordernumber){
              numberlist.push(that.data.orderlist[i].ordernumber)
        }
      }
      else if(i==that.data.orderlist.length-1){
        if(that.data.orderlist[i].ordernumber==that.data.orderlist[i-1].ordernumber){
          numberlist.push(that.data.orderlist[i].ordernumber)
        }
        }
        }
      }
        that.setData({
          numberlist:numberlist
        })
        that.getallshoppro();
        // numberlist.push(that.data.prolist)
        // console.log(that.data.prolist) 
        // console.log(that.data.numberlist)
      },
   
      fail:function(){
        console.log('查询全部订单失败')
      }

    })
  },

  //获取订单对应商品 
  getallshoppro(){
    let that=this;
    let allinfo=wx.getStorageSync('userinfo')
    let list=[];
    //所有请求完成后
    function allComplete(){
        that.setData({
          prolist:list
        })
    }
    // console.log(that.data.numberlist)
           //订单下商品存储
    let count=0;
    for(let j=0;j<that.data.numberlist.length;j++){
      let k=j;
            wx.request({
              url: 'http://localhost:3000/getallorderlist?',
              data:{
                ordernumber:that.data.numberlist[j],
                openid:allinfo.openid
              },
              method:"GET",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success:function(res){     
                  list[k]=res.data
              },
              fail:function(){
                console.log('查询订单商品失败')
              },
              complete:()=>{
                count++;
                if(count==that.data.numberlist.length){
                  allComplete();
                }
              
                // console.log(count)
              }
            })
         
          } 
          // console.log(that.data.prolist)         
  },
  // 获取分类商品总
  getclassify(){
    let that=this;
    let allinfo=wx.getStorageSync('userinfo')
    // console.log(allinfo.openid)
    wx.request({
      url: 'http://localhost:3000/conshop?',
      data:{
        openid:allinfo.openid,
        orderstatus:that.data.status
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          orderlist:res.data.list
        })
//订单号存储
        let numberlist=new Array();
        // console.log(that.data.orderlist.length-1)
        if(that.data.orderlist.length==1){
          numberlist.push(that.data.orderlist[0].ordernumber)
        }
        else{
      for(let i=0;i<that.data.orderlist.length;i++){
        if(i+1<=that.data.orderlist.length-1){
          // console.log(that.data.orderlist[i].ordernumber!=that.data.orderlist[i+1].ordernumber)
           if(that.data.orderlist[i].ordernumber!=that.data.orderlist[i+1].ordernumber){
              numberlist.push(that.data.orderlist[i].ordernumber)
        }
      }
      else if(i==that.data.orderlist.length-1){
        if(that.data.orderlist[i].ordernumber==that.data.orderlist[i-1].ordernumber){
          numberlist.push(that.data.orderlist[i].ordernumber)
        }
        }
        else if(i==that.data.orderlist.length){
          numberlist.push(that.data.orderlist[i].ordernumber)
        }
        }
        }
        that.setData({
          numberlist:numberlist
        })
        that.getallshoppro();
        // numberlist.push(that.data.prolist)
        // console.log(that.data.prolist) 
        // console.log(that.data.numberlist)
      },
   
      fail:function(){
        console.log('查询全部订单失败')
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.data.status=options.iconname;
    // console.log(options.iconname)
    if(options.iconname=="待付款"){
     that.getclassify();
      that.setData({
        checked1:true
      })
    } 
   else if(options.iconname=="待发货"){
    that.getclassify();
      that.setData({
        checked2:true
      })
    }
    else if(options.iconname=="待收货"){
      that.getclassify();
      that.setData({
        checked3:true
      })
    }
    else if(options.iconname=="已完成"){
      that.getclassify();
      that.setData({
        checked4:true
      })
    }
    else if(options.iconname=="售后"){
      that.getclassify();
      that.setData({
        checked5:true
      })
    }
    else if(options.iconname=="全部"){
     that.getallorder();
      that.setData({
        checked:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getorder();
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