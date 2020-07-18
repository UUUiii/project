// pages/register/register.js
Page({
  data:{
    phoneNumber:'',
    password:'',
    // openid: '',
  },
  photoinput:function(e)
{ 
  this.setData({
    phoneNumber:e.detail.value
  })
  let photo=this.data.phoneNumber
  if (photo.length == 11) {
  let checkPhoneNum = this.checkPhoneNum(photo)
  }
  },
  checkPhone: function (photo) {
    wx.showToast({
    title: '手机号数不对',
    })
    return false 
  },

  checkPhoneNum: function (photo) {
  let str =/^1[3456789]\d{9}$/
  if (str.test(photo)) {
  return true
  } else {
  wx.showToast({
  title: '手机号不正确',
  })
  return false
   }
  },
passwordinput:function(e)
{
this.setData({
  password: e.detail.value
})
},
//获取用户输入
loginBtnClick: function (e) {  
   if(this.data.phoneNumber.length<11){
    let checkPhone = this.checkPhone(this.data.phoneNumber)
   }
   else{
    //  this.setData({
    //    photonum:this.data.phoneNumber,
    //    paw:this.data.password
    //  })
     let that=this;
  wx.login({
    success(res){
      if(res.code){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd2475d54c0826327&secret=35434a6ab7e6c5819a646d8bdcff5632&js_code=JSCODE&grant_type=authorization_code',
          data:{
            js_code:res.code,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method:"get",
          success:function(res){ 
            that.setData({
              openid:res.data.openid,
              userinfo:e.detail.userInfo
             })
            that.data.userinfo.openid=that.data.openid
            // console.log("openid",that.data.openid)
            // console.log("userinfo",that.data.userinfo)
            wx.setStorageSync('userinfo', that.data.userinfo)
            // console.log(that.data)
            wx.request({
              url: 'http://localhost:3000/resiger?',
              data:{
                // id:null,
                openid:res.data.openid,
                counterphoto:that.data.phoneNumber,
                password:that.data.password
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method:"get",
              success:function(res){
                // console.log(that.data)
                wx.redirectTo({
                  url: '/pages/login/login',
                  // success:function(){
                  //   wx.setStorageSync('openid', data)
                  // }
                })
              },
              fail:function(){
              wx.showToast({
                  title: '注册失败！',
                })
              }
            })
          },
          fail:function(){
            console.log("添加失败",res)
          }

        })
      }
    },
    fail:function(){
      console.log("添加失败",res.data)
    }
  })
}
  //  const db = wx.cloud.database()
  //  if(this.data.phoneNumber.length<11){
  //   let checkPhone = this.checkPhone(this.data.phoneNumber)
  //  }
  //  else{
  //     db.collection('counters').add({
  //     data:{
  //       counterphoto:this.data.phoneNumber,
  //       password:this.data.password,   
  //     },
  //     success: res => {
  //       wx.showToast({
  //         title: '注册成功',
  //       })
  //       wx.redirectTo({
  //         url: '/pages/login/login',

  //       })
  //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res)
  //     },
  //     fail: err => {
  //       console.length(counterphoto)
  //       wx.showToast({
  //         icon: 'none',
  //         title: '新增记录失败'
  //       })
  //       console.error('[数据库] [新增记录] 失败：', err)
  //     }
  //   })
  //  }
}
})