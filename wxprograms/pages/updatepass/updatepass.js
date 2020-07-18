// pages/updatepass/updatepass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  update:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:3000/uppass?',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      data:{
        password:that.data.password,
        counterphoto:that.data.photo
      },
      success:function(res){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      },
      fail:function(){
        console.log("修改失败",err)
      }
    })
  },
  photoinput:function(event){
    this.setData({photo:event.detail.value})
  },
  passwordinput:function(event){
    this.setData({password:event.detail.value})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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