<template>
    <div class="up-active">
          <!-- 修改 -->
          <el-dialog  title="修改" :visible.sync="upVisible" width="40%">
  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px"  class="demo-ruleForm"  :inline="true">
      <el-form-item label="活动id" prop="aid">
    <el-input v-model="ruleForm.aid" style="width:300px" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="活动名称" prop="aname">
    <el-input v-model="ruleForm.aname" style="width:300px" ></el-input>
  </el-form-item>
  <el-form-item label="活动地点" prop="aplace" >
    <el-input v-model="ruleForm.aplace" placeholder="请选择活动地点" style="width:400px">
    </el-input>
  </el-form-item>

   <el-form-item label="活动开始时间" required label-width="120px">
    <div class="block">
    <el-date-picker
      v-model="ruleForm.startdate"
      type="datetime"
      @change="start"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择开始时间">
    </el-date-picker>
  </div>
  </el-form-item>
  <div></div>

    <el-form-item label="活动结束时间" required label-width="120px">
    <div class="block">
    <el-date-picker
      v-model="ruleForm.enddate"
      type="datetime"
      @change="end"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择结束时间">
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
  <el-form-item label="活动内容" prop="aconcent"   >
    <el-input type="textarea" v-model="ruleForm.aconcent" style="width:700px" rows="20" cols="30"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="upactive('ruleForm')">修改</el-button>
    <el-button @click="upVisible=false">关闭</el-button>
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
            aname: '',
            aplace: '',
            date: '',
            matnatt: '',
            award: '',
            expenditure: '',
            aconcent: '',
            aorganman:'',
            activedatestart:'',
            activedateend:'',
            startdate:'',
            enddate:'',
            activetype:''
            },
            upVisible:false
    };
    },
    methods: {
           
        //父传子
        openDialog(flag,val){
            this.upVisible=flag
            this.ruleForm.aid=val.aid;
            this.ruleForm.aname=val.aname;
            this.ruleForm.aplace=val.aplace;
            this.ruleForm.matnatt=val.matnatt;
            this.ruleForm.startdate=val.activedatestart;
            this.ruleForm.enddate=val.activedateend;
            this.ruleForm.aorganman=val.aorganman;
            this.ruleForm.expenditure=val.expenditure;
            this.ruleForm.aconcent=val.acontent;
            this.ruleForm.award=val.award;
            this.ruleForm.activetype=val.activetype
        },
        //修改  
        upactive(){
        this.$refs["ruleForm"].validate(valid => {
        if (valid) {
            if(this.ruleForm.startdate=this.ruleForm.startdate){
              this.ruleForm.activedatestart=this.ruleForm.startdate
          
           if(this.ruleForm.enddate=this.ruleForm.enddate){
               this.ruleForm.activedateend=this.ruleForm.enddate
          }
          }
          let params = {
            aid: this.ruleForm.aid,
            aname: this.ruleForm.aname,
            aplace: this.ruleForm.aplace,
            award: this.ruleForm.award,
            aorganman: this.ruleForm.aorganman,
           expenditure: this.ruleForm.expenditure,
           aconcent: this.ruleForm.aconcent,
            activedatestart:this.ruleForm.activedatestart,
            activedateend:this.ruleForm.activedateend,
            matnatt:this.ruleForm.matnatt,
            activetype:this.ruleForm.activetype
          };
          
          this.$http.post("/api/upactiveServer", params).then(res => {
            
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
        //
      start(val){
          this.ruleForm.activedatestart=val;
      },
      end(val){
        this.ruleForm.activedateend=val;
      }
    },
   
}
</script>

<style scoped>
.up-active{
    
  margin-left: 600px;
}
</style>