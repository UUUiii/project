<template>
    <div class="de-active">
          <!-- 修改 -->
   <el-dialog  title="修改" :visible.sync="detailVisible" width="44%">
  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px"  class="demo-ruleForm">
  <el-form-item label="活动名称" prop="aname">
    <el-input v-model="ruleForm.aname" style="width:300px" :disabled="true" ></el-input>
  </el-form-item>
  <el-form-item label="活动地点" prop="aplace" >
    <el-input v-model="ruleForm.aplace" placeholder="请选择活动地点" style="width:400px" :disabled="true">
    </el-input>
  </el-form-item>
   <el-form-item label="活动开始时间" prop="startdate" >
    <el-input v-model="ruleForm.startdate" placeholder="选择日期时间" style="width:400px" :disabled="true">
    </el-input>
  </el-form-item>
   <el-form-item label="活动结束时间" prop="enddate" >
    <el-input v-model="ruleForm.enddate" placeholder="选择日期时间" style="width:400px" :disabled="true">
    </el-input>
  </el-form-item>
 <!-- <el-form-item label="活动开始时间" required>
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
    <el-form-item label="活动结束时间" required>
    <div class="block">
    <el-date-picker
      v-model="ruleForm.enddate"
      type="datetime"
      @change="end"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
  </el-form-item> -->
  <el-form-item label="注意事项" prop="matnatt">
    <el-input type="textarea" v-model="ruleForm.matnatt" style="width:400px" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="活动奖励" prop="award" >
    <el-input   type="textarea" v-model="ruleForm.award" style="width:500px" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="活动组织人" prop="aorganman">
    <el-input v-model="ruleForm.aorganman" style="width:500px" :disabled="true">
    </el-input>
  </el-form-item>
   <el-form-item label="活动费用" prop="expenditure">
    <el-input v-model="ruleForm.expenditure" style="width:500px" :disabled="true">
    </el-input>
  </el-form-item>
  <el-form-item label="活动内容" prop="aconcent"   >
    <el-input type="textarea" v-model="ruleForm.aconcent" style="width:700px" rows="20" cols="30" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="detailVisible=false">关闭</el-button>
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
            activedateend:''
            },
            detailVisible:false
    };
    },
    methods: {
      //     //
      // start(val){
      //     this.ruleForm.activedatestart=val;
      // },
      // end(val){
      //   this.ruleForm.activedateend=val;
      // },
          opendialog(flag,val){
            this.detailVisible=flag;
             this.ruleForm.aname=val.aname;
            this.ruleForm.aplace=val.aplace;
            this.ruleForm.matnatt=val.matnatt;
            this.ruleForm.startdate=val.activedatestart;
            this.ruleForm.enddate=val.activedateend;
            this.ruleForm.aorganman=val.aorganman;
            this.ruleForm.expenditure=val.expenditure;
            this.ruleForm.aconcent=val.acontent;
            this.ruleForm.award=val.award
         
      }
    }
}
</script>
<style  scoped>
/* .de-active{
    
  margin-left: 600px;
}
.el-input input{border:none;} */

</style>

