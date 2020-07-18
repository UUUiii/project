// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      typelist:'',
      shoplist:''
  },
   gettype:function () {
     let that=this
      wx.request({
        url: 'http://localhost:3000/gettype',
        method:'get',
        header:{
          'concent-type':'application/json',
        },
        success:function(res){
          that.setData({
            typelist:res.data.list
          })
        },
        fail:function(){
          console.log('查询失败')
        }

      })
   },
   selprotype:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    let types=that.data.typelist.find(r=>r.cid===id)
      //  console.log(types)
      // console.log(that.data.tyeplist)
     types.checked=!types.checked
     that.setData({
        typelist:that.data.typelist,
      })
      wx.request({
        url: 'http://localhost:3000/getprotype?',
        data:{
          type:e.currentTarget.dataset.name
        },
        method:'GET',
        header:{
          'concent-type':'application/json'
        },
      success:function(res){
        that.setData({
          shoplist:res.data.list
        })
      },
      fail:function(){
        console.log('分类查询商品失败')
      }
      })
      types.checked=!types.checked
   },

   //购买
   proclick:function(e){
    let that=this;
    // console.log(e.currentTarget.dataset.id)
    wx.request({
      url: 'http://localhost:3000/selctpid?',
      data:{
        id:e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      success: function(res) {
        // console.log(res.data)
       let shoplist=res.data.list
      //  console.log(shoplist)
      //   console.log(shoplist[0].comimgsrc)
      let info=wx.getStorageSync('userinfo')
      // console.log(serial)
         wx.request({
           url: 'http://localhost:3000/addshop?',
           data:{
             id:e.currentTarget.dataset.id,
             openid:info.openid,
             checked:0,
             comimgsrc:shoplist[0].comimgsrc,
             comname:shoplist[0].comname,
             num:1,
             price:shoplist[0].price,
             specification:'默认'
           },
           header: {
            'content-type': 'application/json' // 默认值
          },
          method:"get",
           success:function(res){
            // wx.switchTab({
            //     url: '/pages/shop/shop',
            //   })
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
           fail:function(){
            wx.showToast({
                    icon: 'none',
                    title: '错误'
                  })
                  console.error('[数据库] [查询记录] 失败：', err)
                }
         })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.gettype()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.selprotype()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
// this.selprotype()
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