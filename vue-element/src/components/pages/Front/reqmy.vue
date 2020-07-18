<template>
  <el-dialog :visible.sync="reqVisible" width="60%">
    <div class="add-active">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="福利信息" required prop="rwname" label-width="100px">
          <el-select v-model="ruleForm.rwname" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.wconcent"
              :label="item.wconcent"
              :value="item.wconcent"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" prop="rwusername">
          <el-input v-model="ruleForm.rwusername" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="工作资历" prop="rwconcent">
          <el-input type="textarea" v-model="ruleForm.rwconcent" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="req('ruleForm')">申请</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      item: { username: null },
      verlist: [{}],
      reqVisible: false,
      options: [],
      ruleForm: {
        rwname: "",
        rwusername: "",
        rwconcent: ""
      }
    };
  },
  methods: {
    //
    //
    getaward() {
      this.$http.get("/api/getward").then(res => {
        this.options = res.data;
        // console.log(this.options)
      });
    },
    //添加
    req() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            rwname: this.ruleForm.rwname,
            rwusername: this.ruleForm.rwusername,
            rwconcent: this.ruleForm.rwconcent
          };
          this.$http.post("/api/addreqward", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
                this.$router.push("/myinfo");
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
      //重置
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    opendialog(flag) {
      this.reqVisible = flag;
    }
  },
  watch: {
    "ruleForm.rwname": function(oldval) {
      this.name = this.item.username;
      // console.log(this.name);
      // console.log(oldval);
      this.$http.get("/api/getuserinfo").then(res => {
        this.verlist = res.data;
        for (var i = 0; i < this.verlist.length; i++) {
          if (
            this.name == this.verlist[i].username &&
            oldval == this.verlist[i].awardinfo
          ) {
            alert("已重复选择！");
          }
        }
      });
    }
  },
  mounted() {
    this.getaward();
    this.item.username = sessionStorage.getItem("username");
  }
};
</script>

<style scoped>
.add-active {
  margin-left: 500px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>