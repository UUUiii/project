<template>
    <div class="add-active">
    
        <el-form :model="ruleForm"  ref="ruleForm"   class="demo-ruleForm" > 
  <el-form-item label="福利内容" prop="wconcent" >
    <el-input v-model="ruleForm.wconcent" placeholder="请输入福利信息" style="width:400px">
    </el-input>
  </el-form-item>
  <el-form-item label="福利要求" prop="wrequire"   >
    <el-input type="textarea" v-model="ruleForm.wrequire" style="width:500px" rows="20" cols="30"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addatcive('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
     
    </div>
</template>
<script>
  export default {
    data() {
      return {
        addwardVisible:true,
        ruleForm: {
          wconcent: '',
          wrequire: '',
          
        },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   startdate: [
        //     { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        //   ],
        //   concent: [
        //     { required: true, message: '请填写活动内容', trigger: 'blur' }
        //   ]
        // }
      };
    },
    methods: {
        //添加 
      addatcive(){
            this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            
            wconcent: this.ruleForm.wconcent,
            wrequire: this.ruleForm.wrequire,
          
          };
          this.$http.post("/api/addawardServer", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
              this.$router.push('/award');
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
      //
         //
    //   start(val){
    //       this.ruleForm.activedatestart=val;
    //   },
    //   end(val){
    //     this.ruleForm.activedateend=val;
    //   }
    }
  }
</script>

<style scoped>
.add-active{   
  margin-left: 600px;
}
 .el-scrollbar__wrap{
      overflow-x: hidden;
    }
</style>