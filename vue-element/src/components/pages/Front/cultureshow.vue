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
      <div class="container">
        <div class="card" v-for="item in cullist" :key="item.culid">
          <div class="imgBx">
            <img :src="item.imgpath" />
          </div>
          <div class="contenBx">
            <div class="concent">
              <h2>{{item.title}}</h2>
              <p>{{item.concent}}</p>
            </div>
          </div>
        </div>
      </div>
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
    backindex() {
      this.$router.push("/index");
    },
    mylog() {
      this.$router.push("/myplace");
    },
    //
    imgset() {
      this.$http.get("/api/selectculture").then(res => {
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
  margin-left: -2270px;
  height: 60px;
  line-height: 60px;
  background: #a9a9a9;
  color: black;
  font-size: 23px;
  font-weight: bold;
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
/* 自适应代码 */
* {
  box-sizing: border-box;
  font-family: "宋体";
}

body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  height: 1200px;
}

.container {
  margin-top: 400px;
  position: relative;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container .card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 100px 0;
}

.container .card:nth-child(odd) {
  flex-direction: row;
}

.container .card:nth-child(even) {
  flex-direction: row-reverse;
  text-align: right;
}

.container .card .imgBx {
  position: relative;
  width: 500px;
  height: 400px;
  left: 25px;
  z-index: 1;
}

.container .card:nth-child(even) .imgBx {
  left: -25px;
}

.container .card .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /*替换内容样式，cover与框架大小一致*/
}

.container .card .contenBx {
  position: relative;
  right: 25px;
  width: 400px;
  height: 400px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 60px 20px 100px;
}

.container .card:nth-child(even) .contenBx {
  right: -25px;
  padding: 20px 100px 20px 60px;
}

.container .card .contenBx :before {
  content: "";
  position: absolute;
  top: -50px;
  bottom: -50px;
  left: 0;
  right: 0;
  background: #000;
  z-index: -1;
}

.container .card .contenBx h2 {
  font-size: 30px;
  color: #fff;
}

.container .card .contenBx p {
  margin-top: 10px;
  color: #fff;
}

.container .card .contenBx a {
  display: inline-block;
  margin-top: 15px;
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border: 1px solid #fff;
}

@media (max-width: 1000px) {
  .container .card {
    flex-direction: column;
    max-width: 350px;
    margin: 25px;
  }
  .container .card .imgBx {
    width: 100%;
    height: 250px;
    left: 0;
  }
  .container .card .contenBx {
    width: 100%;
    height: auto;
    right: 0;
    padding: 30px;
    text-align: center;
  }
  .container .card .contenBx :before {
    top: 0;
    bottom: 0;
  }
  .container .card:nth-child(even) .imgBx {
    left: 0px;
  }
  .container .card:nth-child(even) .contenBx {
    right: 0;
    padding: 30px;
  }
}
</style>
