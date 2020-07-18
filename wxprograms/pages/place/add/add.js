// pages/place/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:''
  },
  user:function(event){
    this.setData({
      getuser:event.detail.value
    })
  },
  photo:function(event){
    this.setData({
      getphoto:event.detail.value
    })
  },
  place:function(event){
    this.setData({
      getplace:event.detail.value
    })
  },
  deplace:function(event){
    this.setData({
      getdeplace:event.detail.value
    })
  },
  setplace:function(){
    let that=this;
   let info=wx.getStorageSync('userinfo')
    wx.request({
      url: 'http://localhost:3000/addplace?',
      data:{
       openid:info.openid,
       username:that.data.getuser,
       photo:that.data.getphoto,
       place:that.data.getplace,
       deplace:that.data.getdeplace
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      success:function(res){
        wx.redirectTo({
          url: '/pages/place/place',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setplace();
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