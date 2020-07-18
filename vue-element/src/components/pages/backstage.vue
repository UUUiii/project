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
            default-active="index"
            active-text-color="#ffd04b"
            :router="true"
          
          >
               <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group title>
                <el-menu-item index="user">用户列表</el-menu-item>
                  <el-menu-item index="userinfo">成员信息</el-menu-item>
                   <el-menu-item index="culture">企业文化</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" >
              <template slot="title">
                <i class="el-icon-s-flag" ></i>
                <span>活动管理</span>
              </template>
              <el-menu-item-group title>
                <el-menu-item index="active" >活动查看</el-menu-item>
                  <el-menu-item index="infrom" >通知查看</el-menu-item>
                <el-menu-item index="addactive" >活动发布</el-menu-item>
                <el-menu-item index="activereq" >活动申请人员查看</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
              <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>福利管理</span>
              </template>
              <el-menu-item-group title>
                <el-menu-item index="award" >福利查看</el-menu-item>
                <el-menu-item index="addaward">福利发布</el-menu-item>
                <el-menu-item index="req" >福利申请人员查看</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>经费管理</span>
              </template>
              <el-menu-item-group title>
                <el-menu-item index="findex" >经费查看</el-menu-item>
                <el-menu-item index="expenditrue" >经费支出详情</el-menu-item>
                <el-menu-item index="income" >经费来源详情</el-menu-item>
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
              欢迎管理员<b> {{ items.username }}</b>
              </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="index">工会首页</el-dropdown-item>
                <el-dropdown-item divided
                                 ><a href="/login">退出登录</a></el-dropdown-item>
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
export default {
  name: 'Container',
  data() {
    return {
      username: '',
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
    // logout: function () {
    //   this.$confirm('确认退出?', '提示', {})
    //     .then(() => {
    //       sessionStorage.removeItem('user');
    //       this.$router.push('login');
    //     })
    //     .catch(() => { });
    // },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
   
  },

  mounted: function () {
   this.items.username=sessionStorage.getItem("username"); 
  //  console.log(this.items.username)
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