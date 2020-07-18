Page({
    data: {
    userinfo:{},
    openid:"",
  },
  onGotUserInfo:function(e){
    let that=this;
    if(that.data.password!=null&&that.data.photo!=null){
    wx.request({
      url: 'http://localhost:3000/loginserver',
      data:{
        counterphoto:that.data.photo,
        password:that.data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"get",
      success:function(res){
      if(res.data.list.length!=0){
       wx.switchTab({
         url: '/pages/index/index',
       })
      }
      else{
        wx.showToast({
          title: '手机号或密码错误',
        })
      }
      },
    })
  }
  else{
    wx.showToast({
      title: '请先输入内容',
    })
  }
    // const that=this
    //  const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('counters').get({
    //   success: res => { 
    //     let cphoto=res.data
    //     if(this.data.photo!=null&&this.data.password!=null){
    //     for(var i=0;i<cphoto.length;i++){
    //           if(this.data.photo==cphoto[i].counterphoto&&
    //         this.data.password==cphoto[i].password){
    //         wx.cloud.callFunction({
    //           name:'getopenid',
    //           success:res=>{
    //             console.log("调用成功")
    //             that.setData({
    //               openid:res.result.openid,
    //               userinfo:e.detail.userInfo
    //             })
    //             that.data.userinfo.openid=that.data.openid
    //             // console.log("openid",that.data.openid)
    //             // console.log("userinfo",that.data.userinfo)
    //             wx.setStorageSync('userinfo', that.data.userinfo)
    //             wx.switchTab({
    //               url: '/pages/index/index',
    //             })
    //           },
    //           fail:res=>{
    //             console.log("调用失败")
    //           }
    //         })
    //       }

    //     }
    //   }
    //      else{
    //        wx.showToast({
    //          title: '请输入！',
    //        })
    //      }
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '请先注册'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },
  onLoad:function(options){
    // const ui=wx.getStorageSync('userinfo')
    // this.setData({
    //   userinfo:ui,
    //   openid:ui.openid
    // })
  },
  rushto:function(){
    wx.navigateTo({
      url:'/pages/register/register'
  })
  },
  updatepass:function(){
    wx.navigateTo({
      url:'/pages/updatepass/updatepass'
  })
  },
  photoinput:function(event){
    this.setData({photo:event.detail.value})
  },
  passwordinput:function(event){
    this.setData({password:event.detail.value})
  }

})


