<template>
    <div class="add-active">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-ruleForm" > 
  <el-form-item label="活动名称" prop="aname">
    <el-input v-model="ruleForm.aname" style="width:300px" ></el-input>
  </el-form-item>
  <el-form-item label="活动地点" prop="aplace" >
    <el-input v-model="ruleForm.aplace" placeholder="请选择活动地点" style="width:400px">
    </el-input>
  </el-form-item>
  <el-form-item label="活动开始时间" required >
    <div class="block">
    <el-date-picker
      v-model="ruleForm.startdate"
      type="datetime"
      @change="start"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
  </el-form-item>
    <el-form-item label="活动结束时间" required >
    <div class="block">
    <el-date-picker
      v-model="ruleForm.enddate"
      type="datetime"
      @change="end"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
  </el-form-item>
  <el-form-item label="注意事项" prop="matnatt">
    <el-input type="textarea" v-model="ruleForm.matnatt" style="width:400px"></el-input>
  </el-form-item>
  <el-form-item label="活动类型" prop="activetype">
    <el-radio-group v-model="ruleForm.activetype">
      <el-radio label="活动" ></el-radio>
      <el-radio label="通知" ></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动奖励" prop="award" >
    <el-input   type="textarea" v-model="ruleForm.award" style="width:500px"></el-input>
  </el-form-item>
  <el-form-item label="活动组织人" prop="aorganman">
    <el-input v-model="ruleForm.aorganman" style="width:500px">
    </el-input>
  </el-form-item>
   <el-form-item label="活动费用" prop="expenditure">
    <el-input v-model="ruleForm.expenditure" style="width:500px">
    </el-input>
  </el-form-item>
  <el-form-item label="活动内容" prop="concent"   >
    <el-input type="textarea" v-model="ruleForm.concent" style="width:700px" rows="20" cols="30"></el-input>
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
        addVisible:true,
        ruleForm: {
          aname: '',
          aplace: '',
          date: '',
          matnatt: '',
          award: '',
          expenditure: '',
          concent: '',
          aorganman:'',
          activedatestart:'',
          activedateend:'',
          activetype:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          startdate: [
            { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
          ],
          concent: [
            { required: true, message: '请填写活动内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        //添加 
      addatcive(){
            this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
            aid: this.ruleForm.aid,
            aname: this.ruleForm.aname,
            aplace: this.ruleForm.aplace,
            award: this.ruleForm.award,
            aorganman: this.ruleForm.aorganman,
           expenditure: this.ruleForm.expenditure,
           concent: this.ruleForm.concent,
            activedatestart: this.ruleForm.activedatestart,
            activedateend:this.ruleForm.activedateend,
            matnatt:this.ruleForm.matnatt,
            activetype:this.ruleForm.activetype
          };
          this.$http.post("/api/addactiveServer", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
              this.$router.push('/active');
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
      start(val){
          this.ruleForm.activedatestart=val;
      },
      end(val){
        this.ruleForm.activedateend=val;
      }
    }
  }
</script>

<style scoped>
.add-active{   
  margin-left: 600px;
  /* overflow-y: scroll; */
  overflow-y:scroll;
  
  height: 800px;
}
 .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    
</style>