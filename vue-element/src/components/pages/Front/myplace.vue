<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
        <span @click="backhome">  <img src="@/assets/logo.jpeg"
               :width="isCollapse ? '210' : '230'"
               height="70" /></span>
        </div>
        <div>
          <!-- 我是样例菜单 -->
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="aquamarine"
            text-color="black"
            :default-openeds="openpath"
            default-active="index"
            active-text-color="#ffd04b"
            :router="true"
            
          >
               <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>我的个人信息</span>
              </template>
              <el-menu-item-group title>
                   <el-menu-item index="myinfo">个人信息查看</el-menu-item>
                <el-menu-item index="myward" >福利情况</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <!--头部-->
          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
              <span class="header-img"> 
                <img src="/static/img/img.jpg"  width="60" height="70" style="header-img"/>
              </span> 
              <span class="header-font">
              欢迎<b> {{ items.username }}</b>
              </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="index">工会首页</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>
import myinfo from '@/components/pages/Front/myinfo'
export default {
  components:{
   myinfo
  },
  name: 'Container',
  data() {
    return {
      openpath:['1'],
      username:'',
      name:'',
      isCollapse: false,
      items:{username:null},
      activepath:''
    }
  },
  methods: {
  
    //
    backhome(){
      this.$router.push('/backstage')
    },
    //
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    //
    index(){
      this.$router.push('index')
    },
    //
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
   //
  },

  mounted: function () {
   this.items.username=sessionStorage.getItem("username"); 
    // sessionStorage.setItem("name",sessionStorage.getItem("username")) 
//   console.log( sessionStorage.setItem("name",this.items.username)) 

  },
}
</script>

<style>
.header-img{
  position:absolute;
  margin-left: -80px;
  overflow: hidden;
}
.header-font{
  line-height: 90px;
  height: 90px;
}

</style>