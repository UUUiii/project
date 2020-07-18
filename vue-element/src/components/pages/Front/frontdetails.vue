<template>
<el-dialog :visible.sync="deaVisible">
  <div class="main">
  <span class="title"> <h1>{{this.ruleForm.aname}}</h1> </span>
  <div class="time-show">
  开始时间:<span>{{this.ruleForm.startdate}}</span> 结束时间:<span>{{this.ruleForm.enddate}}</span>
  </div>
  <div class="place-show">
    <span>活动地点:</span>
  <span>{{this.ruleForm.aplace}}</span>
  </div>
   <div class="aorganman-show">
    <span>活动组织者:</span>
  <span>{{this.ruleForm.aorganman}}</span>
  </div>
  <div class="concent-show">
  <span>{{this.ruleForm.aconcent}}</span>
  </div>
   <div class="matnatt-show">
     <span class="matnatt-title">注意事项:</span>
     <br>
  <span class="matnatt-concent">{{this.ruleForm.matnatt}}</span>
  <!-- <textarea class="matnatt" v-model="this.ruleForm.matnatt"></textarea> -->
  </div>
    <div class="award-show">
     <span class="matnatt-title">活动奖励:</span>
     <br>
  <span class="award-concent">{{this.ruleForm.award}}</span>
  <!-- <textarea class="matnatt" v-model="this.ruleForm.matnatt"></textarea> -->
  </div>
   
  <el-button @click="req" style="width:100px;margin-left:400px;margin-top:30px;">申请</el-button>

  <!--  -->
  </div>
</el-dialog>

  </template>
  <<script>
  export default {
      data() {
          return {
            deaVisible:false,
            ruleForm:{
            aname: '',
            aplace: '',
            date: '',
            matnatt: '',
            award: '',
            expenditure: '',
            aconcent:'',
            aorganman:'',
            activedatestart:'',
            activedateend:''
            },
          
            
          }
      },
      methods: {   

          openDialog(val){
            this.deaVisible=true;
            this.ruleForm.aid=val.aid;
            this.ruleForm.aname=val.aname;
            this.ruleForm.aplace=val.aplace;
            this.ruleForm.matnatt=val.matnatt;
            this.ruleForm.startdate=val.activedatestart;
            this.ruleForm.enddate=val.activedateend;
            this.ruleForm.aorganman=val.aorganman;
            this.ruleForm.expenditure=val.expenditure;
            this.ruleForm.aconcent=val.acontent;
            this.ruleForm.award=val.award
          },
          req(){
              this.$router.push('/reqfront')
          },
  }
  }
  </script>
<style  scoped>
.main{
  display: flex;
   flex-direction:column;
   justify-content:center;
}
.title{
  font-family: '宋体';
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
}
.time-show{
  font-family: '宋体';
  font-size: 12px;
  color:darkgray;
  margin-top: -20px;
  text-align: center;
}
.place-show{
  color: black;
  font-family: '宋体';
  font-size: 12px;
  width: 160px;
  margin-left: 200px;
  margin-top: 30px;
}
.aorganman-show{
  color: black;
  font-family: '宋体';
  font-size: 12px;
  width: 160px;
  margin-left: 200px;
  margin-top: 30px;
}
.concent-show{
  margin-left: 150px;
  margin-top: 30px;
  font-family: '宋体';
  font-size: 20px;
  text-indent: 30px;
  letter-spacing:8px;
  color: black;
  width: 600px;
  text-align: left;
  line-height: 40px;
}
.matnatt-show{
  width: 700px;
  margin-left: 100px;
}
.matnatt-title{
  font-family: '宋体';
  font-size: 23px;
  font-weight: bold;
  text-align: left;
  margin-left: -700px;
}
.matnatt-concent{
  font-family: '宋体';
  font-size: 17px;
  letter-spacing: 5px;
  line-height: 30px;
}
.award-show{
  width: 700px;
  margin-left: 100px;
}
.award-concent{
  font-family: '宋体';
  text-indent: 5px;
  font-size: 18px;
  letter-spacing:5px;
  line-height: 30px;
}

   .el-header, .el-footer {
    background-color: #B3C0D1;
    
  }
  
  .footer{
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    color:white;
    text-align: right;
    line-height: 70px
  }
a{
 color: white; 
}
a:hover{
  color: #333
}
  </style>
   