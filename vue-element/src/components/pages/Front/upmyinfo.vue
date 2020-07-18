<template>
<el-dialog :visible.sync="reqVisible" width="60%">
    <div class="add-active">
 <el-form :model="ruleForm"  ref="ruleForm"   class="demo-ruleForm" > 
<el-form-item label="序号" prop="id">
    <el-input v-model="ruleForm.id" style="width:200px"  disabled></el-input>
  </el-form-item>
 <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username" style="width:200px" ></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password" style="width:200px" ></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="telphoto" >
    <el-input v-model="ruleForm.telphoto"  style="width:200px"></el-input>
  </el-form-item>
<el-form-item label="性别" label-position="right" label-width="80px">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
  <el-form-item label="邮箱" prop="emali">
    <el-input  v-model="ruleForm.emali" style="width:300px"></el-input>
  </el-form-item>
  <el-form-item label="地址" prop="cenreg">
    <el-input  v-model="ruleForm.cenreg" style="width:300px"></el-input>
  </el-form-item>
  <el-form-item label="部门" prop="token">
    <el-input  v-model="ruleForm.token" style="width:300px"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="req('ruleForm')">修改</el-button>
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
      reqVisible:false,
        ruleForm: {
          id:'',
          username: '',
          telphoto: '',
          cenreg: '',
          token:'',
          password:'',
          emali:'',
          sex:'',
          
        }
       
      };
    },
    methods: {
        //
        opendialog(flag,val){
            this.reqVisible=flag,
            this.ruleForm.id=val
        },
        //修改
      req(){
        this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
           username:this.ruleForm.username,
           telphoto:this.ruleForm.telphoto,
           cenreg:this.ruleForm.cenreg,
           password:this.ruleForm.password,
           emali:this.ruleForm.emali,
           token:this.ruleForm.token,
           sex:this.ruleForm.sex,
           id:this.ruleForm.id
          };
          this.$http.post("/api/upmyinfo", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              }),
              this.reqVisible=false;
              this.$router.push('/login');
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
 
    }
    
  }
</script>

<style scoped>
.add-active{   
  margin-left: 500px;
}
 .el-scrollbar__wrap{
      overflow-x: hidden;
    }
</style>