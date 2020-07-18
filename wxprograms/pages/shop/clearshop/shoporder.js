// pages/shop/clearshop/shoporder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect:false,
    sel:false,
    sell:false,
    shopnum:'',
    oshoplist:'',
    totelprice:'',
    message:'',
    name:'',
    photo:'',
    getway:'',
    place:'',
  },
  //配送方式
 sell:function(e){
   let that=this;
  // console.log(e.currentTarget.dataset.way)
  if(e.currentTarget.dataset.way=="上门自提"){
    that.data.sel=! that.data.sel
    that.setData({
      sel:that.data.sel,
      sell:false,
      getway:e.currentTarget.dataset.way
    })
  }
  else if(e.currentTarget.dataset.way=="快递配送"){
    that.data.sell=! that.data.sell
    that.setData({
      sell:that.data.sell,
      sel:false,
      getway:e.currentTarget.dataset.way
    })
  }
 },
 //获取地址
 gain:function(){
   let that=this;
   let pinfo=wx.getStorageSync('userinfo')
  //  console.log(pinfo.openid)
   wx.request({
     url: 'http://localhost:3000/getplace?', 
     data:{
       openid:pinfo.openid
     },
     method:'GET',
     header:{
       'concent-type':'application/json'
     },
     success:function(res){
      //  console.log(res.data.list)
      let placelist=new Array()
       for(let i=0;i<res.data.list.length;i++){
        //  console.log(res.data.list[i].place)
          placelist.push(res.data.list[i].place+res.data.list[i].deplace)
       }  
      //  console.log(placelist)
       wx.showActionSheet({
         itemList:placelist,
        success (res) {
          // console.log(placelist[res.tapIndex])
          that.setData({
            place:placelist[res.tapIndex]
          })
        },
        fail (res) {
          console.log(res.errMsg)
        }
       })
     }
   })

 },
  //留言信息
 msg:function(event){
  //  console.log(event)
  this.setData({
    message:event.detail.value
  })
 },
 //姓名
 name:function(event){
  this.setData({
    name:event.detail.value
  })
 },
 //电话
 photo:function(event){
  this.setData({
    photo:event.detail.value
  })
 },
 //地址
 place:function(event){
  this.setData({
    place:event.detail.value
  })
 },
 //商品列表
  getshoporder:function(){
    let that=this;
    // console.log(that.data.shopnum)
    wx.request({
      url: 'http://localhost:3000/getshopnum?',
      data:{
        number:that.data.shopnum
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          oshoplist:res.data.list
        })
        let price=0;
        // console.log(that.data.oshoplist)
        for(var i=0;i<that.data.oshoplist.length;i++){ 
          price+=that.data.oshoplist[i].price 
          // console.log(price)
          that.setData({
            totelprice:price
          })
        }
      }
    })
  },
 
  //支付口
  payment:function(){
    let that=this;
    let info=wx.getStorageSync('userinfo')
    let date=that.getdate()
    // console.log(that.data.getway)
     if(that.data.sel==false&&that.data.sell==false){
       wx.showToast({
         title: '请选择配送方式',
       })
     }  
     else if(that.data.name==""){ 
      wx.showToast({
        title: '请输入姓名',
      })
       }
       else if(that.data.photo==""){ 
        wx.showToast({
          title: '请输入电话号',
        })
         }else if(that.data.place==""){ 
          wx.showToast({
            title: '请输入地址',
          })
           }
      else { 
        for(var i=0;i<that.data.oshoplist.length;i++){ 
        wx.request({
          url: 'http://localhost:3000/addorder?',
          method:"GET",
          header:{
            'content-type':'application/json'
          },
          data:{
            id:null,
            openid:info.openid,
            ordername:that.data.oshoplist[i].comname,
            orderstatus:'待付款',
            orderprice:that.data.oshoplist[i].price,
            ordernumber:that.data.oshoplist[i].number,
            orderplace:that.data.place,
            orderdate:date,
            ordernum:that.data.oshoplist[i].num,
            orderimgsrc:that.data.oshoplist[i].comimgsrc,
            orderbuyname:that.data.name,
            message:that.data.message,
            way:that.data.getway,
            sumprice:that.data.totelprice
          },
          success:function(res){
            for(var i=0;i<that.data.oshoplist.length;i++){ 
              // console.log(that.data.oshoplist[i].num)
            wx.request({
              url: 'http://localhost:3000/upnum?',
              method:"GET",
              header:{
                'content-type':'application/json'
              },
              data:{
                comnum:that.data.oshoplist[i].num,
                comname:that.data.oshoplist[i].comname,
              },
              success:function(){
              console.log(1)
            }
            })
          }
          wx.request({
            url: 'http://localhost:3000/delusershop?',
            method:"GET",
            header:{
              'content-type':'application/json'
            },
            data:{
              openid:info.openid
            },
            success:function(){
            console.log(1)
          }
          })
          wx.showToast({
            title: '已支付',
            success:function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
          },
          fail:function(){
            console.log(err)
          }
        })
      }
    }
  },



  //日期获取
  getdate:function () {
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
    return(clock);
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.data.shopnum=wx.getStorageSync('shopnum')
    this.getshoporder();
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