<template>
  <div class="login-page">
    <div class="head">
      <div>
        <span class="title">工会管理系统</span>
      </div>
    </div>
    <div class="login-wrap">
      <div class="ms-login">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              class="login-input"
              placeholder="请输入账号"
              size="large"
            >
              <template slot="prepend">
                <img src="../assets/user.png" alt />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              type="password"
              class="login-input"
              size="large"
            >
              <template slot="prepend">
                <img src="../assets/pwd.png" alt />
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button @click="loginServer">登录</el-button>
          </div>
          <div class="register" @click="regVisible = true">
            <a>注册</a>
          </div>
          <div class="forgetPwd" @click="forgetpas=true">忘记密码？</div>
        </el-form>
      </div>
    </div>
    <!-- forgetpas -->
    <el-dialog title="忘记密码" :visible.sync="forgetpas" width="20%">
      <el-form :inline="true" label-width="80px" label-position="right" :model="pass" ref="pass">
        <el-form-item label="员工号" required prop="usernum">
          <el-input autocomplete="off" v-model="pass.usernum" show-password></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input autocomplete="off" v-model="pass.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="forgetpas = false">取 消</el-button>
        <el-button type="primary" @click="forget('pass')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- register -->
    <el-dialog title="注册" :visible.sync="regVisible" width="20%">
      <el-form
        :inline="true"
        label-width="80px"
        label-position="right"
        :model="query"
        ref="query"
        :rules="rules1"
      >
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input autocomplete="off" v-model="query.id" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" required prop="username" label-width="100px">
          <el-input autocomplete="off" v-model="query.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input autocomplete="off" v-model="query.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" label-position="right" label-width="80px">
          <el-radio-group v-model="query.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工号" required prop="usernum">
          <el-input autocomplete="off" v-model="query.usernum" show-password @keyup="unumber"></el-input>
          <el-button size="small" type="primary" @click="unumber">生成员工号</el-button>
        </el-form-item>
        <el-form-item label="电话" required prop="telphoto">
          <el-input autocomplete="off" v-model="query.telphoto"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required prop="emali">
          <el-input autocomplete="off" v-model="query.emali"></el-input>
        </el-form-item>
        <el-form-item label="部门" required prop="token">
          <el-input autocomplete="off" v-model="query.token"></el-input>
        </el-form-item>
        <el-form-item label="户籍" required prop="cenreg">
          <el-input autocomplete="off" v-model="query.cenreg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regVisible = false">取 消</el-button>
        <el-button type="primary" @click="register('query')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "login",
      tablelist: [{}],
      regVisible: false,
      forgetpas: false,
      ruleForm: {
        username: "",
        password: ""
      },
      imgUrl: "",
      deviceId: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      pass: {
        usernum: "",
        password: ""
      },
      query: {
        id: "",
        username: "",
        password: "",
        ident: "",
        token: "",
        telphoto: "",
        emali: "",
        cenreg: "",
        sex: "",
        usernum: "",
        nametable: []
      },
      //规则
      rules1: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        emali: [
          {
            required: true,
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确邮箱",
            trigger: "blur"
          }
        ],
        telphoto: [
          {
            required: true,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    "query.username": function(newval) {
      this.$http.get("/api/rulename").then(res => {
        if (res.data) {
          this.nametable = res.data;
          for (var i = 0; i < this.nametable.length; i++) {
            if (newval == this.nametable[i].username) {
              alert("用户名重复！" + "修改方式：部门-XXX-员工号后四位");
              this.query.username = "请重新输入";
            }
          }
        }
      });
    }
  },
  methods: {
    //
    //登录
    loginServer() {
      sessionStorage.setItem("username", this.ruleForm.username);
      let params = {
        id: this.query.user_acct,
        username: this.query.username,
        ident: this.query.ident,
        password: this.query.password
      };
      this.load = true;
      this.$http.get("/api/loginServer", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tablelist = res.data;
          var j = this.tablelist.length;
          for (var i = 0; i < this.tablelist.length; i++) {
            --j;
            if (
              this.tablelist[i].username == this.ruleForm.username &&
              this.tablelist[i].password == this.ruleForm.password &&
              this.tablelist[i].ident == "1"
            ) {
              alert("欢迎进入工会管理系统");
              sessionStorage.setItem(
                "islogin",
                JSON.stringify(this.ruleForm.username)
              );
              this.$router.push("/backstage");
              break;
            } else if (
              this.tablelist[i].username == this.ruleForm.username &&
              this.tablelist[i].password == this.ruleForm.password &&
              this.tablelist[i].ident == "0"
            ) {
              alert("欢迎进入工会系统");
              sessionStorage.setItem(
                "islogin",
                JSON.stringify(this.ruleForm.username)
              );
              this.$router.push("/index");
              break;
            } else if (j == 0) {
              alert("账号或密码错误！");
            }
          }
        }
      });
    },
    //忘记密码
    forget() {
      this.$refs["pass"].validate(valid => {
        if (valid) {
          let params = {
            usernum: this.pass.usernum,
            password: this.pass.password
          };
          this.$http.post("/api/forgetServer", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              }),
                location.reload([true]);
              this.regVisible = false;
            } else {
              this.$message({
                showClose: true,
                message: "错误",
                type: "error"
              });
            }
          });
        }
      });
    },
    //生成
    unumber() {
      this.query.usernum =
        new Date().getFullYear() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        Math.random()
          .toString()
          .substr(2, 6);
    },
    //注册
    register() {
      this.$refs["query"].validate(valid => {
        if (valid) {
          let params = {
            usernum: this.query.usernum,
            username: this.query.username,
            password: this.query.password,
            sex: this.query.sex,
            telphoto: this.query.telphoto,
            emali: this.query.emali,
            token: this.query.token,
            cenreg: this.query.cenreg
          };
          this.$http.post("/api/regsiter", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "注册成功",
                type: "success"
              }),
                location.reload([true]);
              this.regVisible = false;
            } else {
              this.$message({
                showClose: true,
                message: "错误",
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  position: absolute;
  color: blue;
  font-size: 14px;
}
.login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  .head {
    line-height: 80px;
    margin-right: 1300px;
    color: #666;
    font-weight: bolder;
    .logo-img {
      position: relative;
      top: 25px;
      width: 118px;
      height: 30px;
      display: inline-block;

      background-size: 100%;
    }
    .rectangle {
      position: absolute;
      //   top: 24px;
      //   left: 213px;
      //   width: 2px;
      //   height: 32px;
      display: inline-block;
      background-image: url(../assets/rectangle.png);
      background-size: 100%;
    }
    .title {
      margin-left: 150px;
      font-size: 20px;
      letter-spacing: 2px;
      height: 20px;
      line-height: 20px;
    }
  }
  .login-wrap {
    position: relative;
    width: 100%;
    height: 80%;
    background-image: url(../assets/background.png);
    background-size: 100%;
    background-position: center center;
    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      border-bottom: 1px solid #ddd;
    }
    .ms-login {
      position: absolute;
      right: 5%;
      top: 60%;
      width: 420px;
      height: 310px;
      margin: -190px 0 0 -175px;
      border-radius: 5px;
      background: #fff;
      overflow: hidden;
    }
    .login-input {
      margin-top: 20px;
      width: 340px;
    }
    .user-name {
      width: 14px;
      height: 16px;
      display: inline-block;
      background-image: url(../assets/user.png);
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 2px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
    .ms-content {
      padding: 40px 40px;
    }
    .code-width {
      width: 60%;
    }
    .code-img-width {
      width: 30%;
      height: 32px;
      margin-left: 5%;
      vertical-align: bottom;
    }
    .login-btn {
      text-align: center;
      margin-top: 25px;
    }
    .login-btn button {
      width: 100%;
      height: 45px;
      margin-bottom: 20px;
      margin-top: 20px;
      font-size: 14px;
      color: #fff;
      background-color: #de5a37;
    }
    .forgetPwd {
      text-align: right;
      color: #3f86d8;
      font-size: 14px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .foot {
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #666;
    .foot-row {
      width: 660px;
      margin: 0 auto;
    }
    .divide {
      margin: 0 10px;
    }
    .email {
      margin: 0 10px 0 20px;
    }
  }
}
</style>
