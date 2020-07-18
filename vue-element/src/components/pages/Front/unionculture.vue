<template>
<div>
  <el-container>
    <el-header>
      <div class="header">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#A9A9A9"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <button @click="backindex" class="dd">返回</button>
          <el-menu-item index="myplace" @click="mylog">我的个人空间</el-menu-item>
          <el-menu-item index="login">退出</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <body>
      <ul class="main">
        <div class="title" @click="cultureshow">企业文化展示</div>
        <li class="lili" v-for="item in cullist" :key="item.culid">
          <img :src="item.imgpath" alt="错误" id="image" />
          <div class="flag">{{item.title}}</div>
        </li>
      </ul>
    </body>
    <el-footer class="footer">
      <span>版权所属</span> &nbsp; 若有需要请联系
      <a href="/login">管理员</a>
    </el-footer>
  </el-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      cullist: [{}],
      imgsrc: ""
    };
  },

  methods: {
    //
    cultureshow() {
      this.$router.push("/cultureshow");
    },
    //
    backindex() {
      this.$router.push("/index");
    },
    mylog() {
      this.$router.push("/myplace");
    },
    //
    imgset() {
      this.$http.get("/api/selculimg").then(res => {
        this.cullist = res.data;
        // console.log(this.cullist);
        // for (var i = 0; i < this.cullist.length; i++) {
        // document.getElementById("image").src = this.cullist[i].imgpath;
        // }
      });
    }
  },
  mounted() {
    this.imgset();
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #a9a9a9;
}
.header {
  float: right;
  font-family: "宋体";
  font-size: 20px;
}
.footer {
  width: 100%;
  height: 30px;
  bottom: 0;
  color: white;
  text-align: right;
  line-height: 60px;
}
.dd {
  float: left;
  margin-left: -1670px;
  height: 60px;
  line-height: 60px;
  background: #a9a9a9;
  color: #fff;
  font-size: 15px;
  bottom: 0;
  border: 0;
}
button:hover {
  color: black;
  background: #fff;
}
/* * {
    margin: 0;
    padding: 0;
} */
.title {
  color: coral;
  font-family: "宋体";
  font-size: 40px;
}
ul,
ol {
  list-style: none;
}

img {
  width: 805px;
  height: 400px;
}

body {
  background: url("/static/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}

/* 百叶窗展示区域 */

.main {
  width: 805px;
  height: 500px;
  margin: 150px auto;
  overflow: hidden;
}

.lili {
  width: 160px;
  float: left;
  border-left: 1px solid #fff;
  position: relative;
  transition: 1s;
  -webkit-transition: 1s;
  -moz-transition: 1s;
  -ms-transition: 1s;
  -o-transition: 1s;
}

.flag {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

.main:hover li {
  width: 40px;
}

.main li:hover {
  width: 640px;
}
</style>
