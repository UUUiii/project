<template>
<div>
  <el-container >
  <el-header> 
  <div class="header"> 
    <el-menu
  class="el-menu-demo"
  mode="horizontal"
  background-color="#A9A9A9"
  text-color="#fff"
  active-text-color="#ffd04b"
  :router="true">
  <el-menu-item index="myplace" @click="mylog">我的个人空间</el-menu-item>
  <el-menu-item ><a href="/login">退出</a></el-menu-item>
</el-menu>
  </div>
  </el-header>  
  

<div class="mian"> 
  <el-main class="bg"> 
    <template> 
      <!--  -->
<div class="lunbo">
  <swiper>
    <div class="swiper-slide" v-for="data in piclist" :key="data.id">
      <img width="1400px" height="580px" :src="data.url" >
    </div>
  </swiper>
  </div>
<!--  -->
  <div class="content">
      <router-view/>
  </div>
  <el-footer class="footer">
    <span >版权所属</span> &nbsp; 若有需要请联系 <a href="/login">管理员</a>
    </el-footer>
    </template>
  </el-main>   
 
 </div> 


<!--  --> 

</el-container>
 

</div>
</template>
<script>
import swiper from '@/components/pages/Front/swiper'
  export default {
    components:{
      swiper
    },
    data() {
      return {
        piclist:[
          {id:'1',url:'/static/img/lun6.jpg'},
          {id:'2',url:'/static/img/lun2.jpg'},
          {id:'3',url:'/static/img/lun3.jpg'},
          {id:'4',url:'/static/img/lun4.jpeg'},
          {id:'5',url:'/static/img/lun5.jpg'}
        ]
      };
    },
    methods: {
    
     mylog(){
       this.$router.push('/myplace')
     }

    }
  }
</script>
<style scoped>
.bg{
  background: url('/static/img/back1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;    
}
.header{
  float: right;
}
  .el-header, .el-footer {
    background-color: #A9A9A9;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 900px;
    overflow: scroll;
    overflow-x: hidden;
  }
  .footer{
    width: 100%;
    height: 30px;
    bottom: 0;
    color:white;
    text-align: right;
    line-height: 60px;
    margin-top: 100px;
  }
a{
 color: white; 
}
a:hover{
  color: #333
}
.lunbo{
  width: 100%;
  margin-left: 240px;
  height: 620px;
  text-align: left;
}
.mian{
  background-color: whitesmoke;
}
.content{
  margin-left: 0; 
}
.bg-concent{
  opacity: 1;
}
.headtext{
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  
}
span:hover{
  color: #fff;
}
</style>