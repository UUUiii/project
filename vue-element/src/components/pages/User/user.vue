<template>
  <div >
      <span class="user-add">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      </span>
      <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
        style=" width:1750px" height="655" border>
         <el-table-column fixed label="序号" min-width="10%"  width="120px" align="center">
       <template slot-scope="scope">
         <span>{{scope.$index+1}}</span>
       </template>
      </el-table-column>
          <el-table-column label="编号" prop="id" v-if="false"></el-table-column>
          <el-table-column
            v-for="(item,index) in columnList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sort"
            :fixed="item.fixed"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" > 
            <template slot-scope="scope">
              <el-button @click="del(scope.row)" type="primary" size="medium"><span style="color:#019fde"> @</span>删除<span  style="color:#019fde">@ </span></el-button>
              <div class="btn">
                <el-button @click="updata(scope.row)" type="primary" size="medium">修改权限</el-button>
              </div>
              <div class="btn">
                   <el-button @click="upadmin(scope.row)" type="primary" size="medium">修改状态</el-button>
              </div>
           
            </template>
          </el-table-column>
        </el-table>
           <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]"
                            :page-size="pagesize" 
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">    
                    </el-pagination>
      </div>
    
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="20%" >
      <el-form :inline="true" label-width="80px" label-position="right"  :model="query"  ref="query" :rules="rules">
        <el-form-item label="ID" prop="id" style="display:none">
          <el-input autocomplete="off" v-model="query.id" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" required prop="username" label-width="100px">
          <el-input autocomplete="off" v-model="query.username"></el-input>
        </el-form-item>
        <el-form-item label="身份" label-position="right" label-width="80px">
          <el-radio-group v-model="query.ident">
            <el-radio label="1">管理员</el-radio>
            <el-radio label="0">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>   
        <el-form-item label="性别" label-position="right" label-width="80px">
          <el-radio-group v-model="query.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input autocomplete="off" v-model="query.password" show-password></el-input>
        </el-form-item>
          <el-form-item label="员工号" required prop="usernum">
          <el-input autocomplete="off" v-model="query.usernum" show-password @keyup="unumber"></el-input>
          <el-button size="small" type="primary" @click="unumber">生成员工号</el-button>
        </el-form-item>
        <el-form-item label="电话" required prop="telephoto">
          <el-input autocomplete="off" v-model="query.telephoto"></el-input>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsure('query')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

 <script>
// import adduser from "@/pages/User/adduser";
export default {
  data() {    
    return {
      name:'user',
       currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      dialogFormVisible: false,
      tableData: [{}],
      columnList: [
        { prop: "username", label: "用户名字", width: "140" },
        { prop: "ident", label: "用户身份", width: "120" },
        { prop: "sex", label: "用户性别", width: "100" },
        { prop: "telphoto", label: "手机号", width: "160" },
        { prop: "emali", label: "邮箱", width: "180" },
        { prop: "token", label: "所属部门", width: "140" },
        { prop: "cenreg", label: "户籍", width: "160" },
        { prop: "usernum", label: "员工号", width: "140" },
        { prop: "admission", label: "工会费缴纳状态", width: "140" }
      ],
      query: {
        id: "",
        username: "",
        password: "",
        ident: "",
        sex: "",
        telephoto: "",
        token: "",
        emali: "",
        cenreg: "",
        usernum:""
      },
    
      //规则
      rules:{
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
         emali:[
            {
            required: true,
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确邮箱",
            trigger: "blur"
          }
          ],
         telephoto:[
           {
            required: true,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
          ]
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
     // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
    //删除
    del(row) {
      this.$http
        .post("/api/delServer", {
          id: row.id
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //
    updata(row) {
      this.$http
        .post("/api/updataServer", {
          id: row.id
        })
        .then(res => {
          location.reload([true]);
        });
    },
     upadmin(row) {
      this.$http
        .post("/api/upadminServer", {
          id: row.id
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //生成
    unumber(){
 this.query.usernum=(new Date().getFullYear())+(new Date().getMinutes())+(new Date().getSeconds())+Math.random().toString().substr(2, 6);
    },
  
    //添加
    addsure() {
      this.$refs["query"].validate(valid => {
        if (valid) {
          let params = {
            id: this.query.id,
            usernum:this.query.usernum,
            username: this.query.username,
            password: this.query.password,
            ident: this.query.ident,
            sex: this.query.sex,
            telephoto: this.query.telephoto,
            emali: this.query.emali,
            token: this.query.token,
            cenreg: this.query.cenreg
          };
          this.$http.post("/api/addServer", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
                location.reload([true]);
              this.dialogFormVisible = false;
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
    //
    getData() {
      let params = {
        id: this.query.user_acct,
        username: this.query.username,
        ident: this.query.ident,
        sex: this.query.sex,
        usernum:this.query.usernum,
        telphoto: this.query.telphoto,
        token: this.query.token,
        emali: this.query.emali
      };
      this.load = true;
      this.$http.get("/api/getdata", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ident == "1") {
              this.tableData[i].ident = "管理员";
            } else if (this.tableData[i].ident == "0") {
              this.tableData[i].ident = "普通用户";
            }
            if (this.tableData[i].sex == "1") {
              this.tableData[i].sex = "男";
            } else if (this.tableData[i].sex == "0") {
              this.tableData[i].sex = "女";
            }
             if(this.tableData[i].admission=='1'){
                     this.tableData[i].admission='已缴纳'
                 }
                 else this.tableData[i].admission='未缴纳'
          }
        } else {
          this.$message({
            showClose: true,
            message: "错误",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
 <style lang="scss" scoped>

.logo-font {
  line-height: 120px;
  height: 120px;
  text-align: right;
  font-family: "宋体";
  font-weight: bold;
  font-size: 20px;
  margin-left: 23px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  width: 20px;
}
.iphoto {
  float: left;
}

.backgound-photo {
  margin-left: 160px;
  padding-top: 40px;
}
.data-show {
  margin-left: 100px;
  margin-top: 100px;
}
.user-add {
  padding-left: 60px;
}
.btn {
  margin-top: 2px;
  position: relative;
}
</style>>
  


 