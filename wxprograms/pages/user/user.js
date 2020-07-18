Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    imgsrc:'',
    iconlist:''
  },
  getuserinfo:function(){
     let that=this;
    this.setData({
        info:wx.getStorageSync('userinfo')
    })
    
  },
  geticonlist:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:3000/getordericon',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      success:function(res){
        that.setData({
          iconlist:res.data.list
        })
        // console.log()
      }
    })
  },
  // 
  moreorder:function(){
    wx.redirectTo({
      url: '/pages/order/order',
    })
  },
  iconto:function(e){
    console.log(e)
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
   this.geticonlist();
   this.getuserinfo();
   
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