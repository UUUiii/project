//index.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    behaviors: ['wx://form-field'],
    swiperlist:'',
    comlist:'',
    iconlist:'',
    openid:'',
    shoplist:'',
    showModal:false
  },
  //功能

// 点击充值弹窗
bclick: function () {
  this.setData({
    showModal: true
  })
},
close_mask: function () {
  this.setData({
    showModal: false
  })
},
 
  //轮播
  getswiperlist: function() {
    let that=this;
    wx.request({
      url: 'http://localhost:3000/getswiper',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success: function(res) {
        that.setData({
          swiperlist:res.data.list
        })
        // console.log(res.data.list)
        // console.log(this.data.courselist)
      }
    })
    
    // const db = wx.cloud.database()
    // // 查询所有的 Swiper
    // db.collection('swiper').get({
    //   success: res => {
    //     this.setData({
    //       swiperlist: res.data
    //     })
    //      console.log('[数据库] [查询记录] 成功: ',res.data)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },
//商品
  getcomlist: function() {
    let that=this;
    wx.request({
      url: 'http://localhost:3000/getproduct',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success: function(res) {
        that.setData({
          comlist:res.data.list
        })
        // console.log(res.data.list)
        // console.log(this.data.iconlist)
      }
    })

    // const db = wx.cloud.database()
    // // 查询所有的商品
    // db.collection('product').get({
    //   success: res => {
    //     this.setData({
    //       comlist: res.data
    //     })
    //      console.log('[数据库] [查询记录] 成功: ',res.data)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },
  //图标
  geticonlist: function() {
    let that=this;
    wx.request({
      url: 'http://localhost:3000/geticon',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success: function(res) {
        that.setData({
          iconlist:res.data.list
        })
        // console.log(res.data.list)
        // console.log(this.data.iconlist)
      }
  
    })


    // const db = wx.cloud.database()
    // // 查询所有的 icon
    // db.collection('icon').get({
    //   success: res => {
    //     this.setData({
    //       iconlist: res.data
    //     })
    //      console.log('[数据库] [查询记录] 成功: ',res.data)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },

  //购物车
  shopclick:function(e){ 
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



    // console.log(e.detail.value)
    // const db = wx.cloud.database()

    // db.collection('product').where({
    //   _id:e.currentTarget.dataset.id
    // }).get({
    //   success:res=>{
    //     let shopgather=res.data
    //  db.collection('shopgather').add({
      
    //   data:{
    //     _id:shopgather[0]._id,
    //     comimgsrc:shopgather[0].comimgsrc,
    //     comname:shopgather[0].comname,
    //     price:shopgather[0].price,
    //     comnum:shopgather[0].comnum,
    //     checked:false
    //   },
    //   success:res=>{ 
    //     // console.log(shopgather[0]._id)
    //       wx.switchTab({
    //   url: '/pages/shop/shop',
    // })
    //   },
    //   fail:err=>{
    //     wx.showToast({
    //       icon: 'none',
    //       title: '重复购买'
    //     })
    //     // console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
    //   },
    //   fail:err=>{
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
      
    // })
   

  


  //
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getswiperlist();
    this.getcomlist();
    this.geticonlist();
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
    this.getcomlist()
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
// 获取应用实例

  
//   getcomlist: function() {
//     const db = wx.cloud.database()
//     // 查询所有的商品
//     db.collection('product').get({
//       success: res => {
//         this.setData({
//           comlist: res.data
//         })
//         console.log('[数据库] [查询记录] 成功: ',res.data)
//       },
//       fail: err => {
//         wx.showToast({
//           icon: 'none',
//           title: '查询记录失败'
//         })
//         console.error('[数据库] [查询记录] 失败：', err)
//       }
//     })
//   },
//    // 上传图片
// doUpload: function () {
//   // 选择图片
//   wx.chooseImage({
//     sizeType: ['compressed'],
//     sourceType: ['album', 'camera'],
//     success: function (res) {
//       wx.showLoading({
//         title: '上传中',
//       })
//       const imgsrc = res.tempFilePaths[0]
//       const db = wx.database()
//       // 上传图片
//       // const cloudPath = imgsrc+ imgsrc.match(/\.[^.]+?$/)[0]
//       db.collection('swiper').add({
//         data:{
//         pid,
//         imgsrc,
//         },
//         success: res => {
//           console.log('[上传文件] 成功：', res)
//           // app.globalData.fileID = res.fileID
//           // app.globalData.cloudPath = cloudPath
//           app.globalData.imagePath = imgsrc
          
//           // wx.navigateTo({
//           //   url: '../storageConsole/storageConsole'
//           // })
//         },
//         fail: e => {
//           console.error('[上传文件] 失败：', e)
//           wx.showToast({
//             icon: 'none',
//             title: '上传失败',
//           })
//         },
//         complete: () => {
//           wx.hideLoading()
//         }
//       })

//     },
//     fail: e => {
//       console.error(e)
//     }
//   })
// },



