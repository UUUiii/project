<template>
    <div class="up-active">
          <!-- 修改 -->
    <el-dialog  title="修改" :visible.sync="upwardVisible" width="40%">
     <el-form :model="ruleForm"  ref="ruleForm"   class="demo-ruleForm" > 
  <el-form-item label="福利内容" prop="wconcent" >
    <el-input v-model="ruleForm.wconcent" placeholder="请选择活动地点" style="width:400px">
    </el-input>
  </el-form-item>
  <el-form-item label="福利要求" prop="wrequire"   >
    <el-input type="textarea" v-model="ruleForm.wrequire" style="width:500px" rows="20" cols="30"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="upaward('ruleForm')">修改</el-button>
    <el-button @click="upwardVisible=false">关闭</el-button>
  </el-form-item>
     </el-form>
          </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ruleForm:{
            wconcent: '',
            wrequire: '',
            
            },
            upwardVisible:false
    };
    },
    methods: {
           
        //父传子
        openDialog(flag,val){
            this.upwardVisible=flag
            this.ruleForm.wid=val.wid;
            this.ruleForm.wconcent=val.wconcent;
            this.ruleForm.wrequire=val.wrequire;
           
        },
        //修改  
        upaward(){
        this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            wid: this.ruleForm.wid,
            wconcent: this.ruleForm.wconcent,
            wrequire: this.ruleForm.wrequire,
          };
          this.$http.post("/api/upwardServer", params).then(res => {
            
            if (res.data) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              }),
              this.upVisible=false
                location.reload([true]);
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
    //     //
    //   start(val){
    //       this.ruleForm.activedatestart=val;
    //   },
    //   end(val){
    //     this.ruleForm.activedateend=val;
    //   }
    },
   
}
</script>

<style scoped>
.up-active{
    
  margin-left: 600px;
}
</style>