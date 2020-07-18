<template>
<div>
  <div class="page-index">
      <table>
        <tr>
          <td @click="backindex">首页</td>
          </tr>
        <tr>
          <td @click="unionculture">公司文化</td>
          </tr>
        <tr>
          <td class="on">活动申请</td>
          </tr>
      </table>
         </div>   

         <div class="data_active">
           <h1>活动申请</h1>
         </div>
         <hr>
    <div class="add-active">
 <el-form :model="ruleForm"  ref="ruleForm"   class="demo-ruleForm" > 
 <el-form-item label="活动名称" required prop="aname" >
            <el-select v-model="ruleForm.aname" placeholder="请选择" >
                <el-option
                v-for="item in options"
                :key="item.aname"
                :label="item.aname"
                :value="item.aname">
                </el-option>
            </el-select>
          </el-form-item>
  <el-form-item label="申请人:" required prop="rusername">
    <el-input v-model="ruleForm.rusername"  style="width:200px"></el-input>
  </el-form-item>

  <el-form-item label="申请内容:" required prop="rconcent">
    <el-input type="textarea" v-model="ruleForm.rconcent" style="width:300px"></el-input>
  </el-form-item>
  <el-form-item>
    <div class="btn">
    <el-button type="primary" @click="req('ruleForm')">申请</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-form-item>
</el-form>
    </div>
    
</div>
</template>
<script>
  export default {
    data() {
      return {
       options:[],
        ruleForm: {
          rname: '',
          rusername: '',
          rconcent: ''
        }
       
      };
    },
    methods: {
      //
        backindex(){
      this.$router.push("/index")
    },
    //
    unionculture(){
      this.$router.push("/unionculture")
    },
        //添加 
      req(){
            this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            rname: this.ruleForm.aname,
            rusername: this.ruleForm.rusername,
            rconcent: this.ruleForm.rconcent,
          };
          this.$http.post("/api/addreq", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
              this.$router.push('/index');
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
    getavtive(){
      this.$http.get("/api/getaname").then(res=>{
            this.options=res.data
             console.log(this.options)
        })
    }
    },
    mounted(){
      this.getavtive();
    }
  }
</script>

<style scoped>

.add-active{   
  margin-top: 40px;
  margin-left: 700px;
  width: 400px;
  height: 500px;
}
 .el-scrollbar__wrap{
      overflow-x: hidden;
    }
.data_active{
  font-family: '宋体';
  font-weight: bold;
  font-size: 22px;
  margin-left: 200px;
  width: 200px;
  text-align: center;
 background-color: bisque;
 height: 50px;
 line-height: 50px;
 border-radius: 10px;
}

    .page-index{
  width:130px;
  font-family: '宋体';
  font-size: 20px;
  color: white;
  background-color:coral;
  position:fixed;
  top:600px;
}
.on{
  background-color: white;
  color: black;
}
table,td{
  border: 1px solid whitesmoke;
  width: 130px;
  line-height: 30px;
}
td{
  padding:10px;
 text-align: center;
}
td:hover{
  color: black;
  background-color: white
}
.btn{
  margin-left: 100px;
}
</style>