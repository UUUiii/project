<template>
<div class="data_main">
    <button @click="getdata" class="find" >查看我的个人信息</button>  
    <button @click="opendialogac" class="find" >活动申请情况</button>  
    <button @click="opendialogmyreq" class="find" >福利申请情况</button>     
      <h1>个人信息：</h1> 
      <div class="data_show">  
         <div class="frist_4">
         <span >用户名:{{this.username}}</span>
         <span>员工号:{{this.usernum}}</span>  
         <span>手机号：{{this.telphoto}}</span>
        <span>密码:{{this.password}}</span>
         </div>
         <div class="last_4">
         <span> 性别：{{this.sex}}</span>
         <span>邮箱:{{this.emali}}</span> 
        <span>地址:{{this.cenreg}}</span> 
        <span>部门：{{this.token}}</span> 
         <span>工会费缴纳情况:{{this.admission}}</span>
         </div>
        </div> 
        <div class="btn">
        <button @click="upmyinfo">修改</button>   
        </div> 

         <upmyinfo ref="upmyinfo"></upmyinfo>
    <myactivereq ref="myactivereq"></myactivereq>
    <mywreq ref="mywreq"></mywreq>>
</div>         
</template>
<script>
import upmyinfo from '@/components/pages/Front/upmyinfo'
import myactivereq from '@/components/pages/Front/myactivereq'
import mywreq from '@/components/pages/Front/mywreq'
export default {
   components:{
       upmyinfo,
       myactivereq,
       mywreq
   },
    data(){
        return{
            name:'',
            rulename:'',
            item:{username:null},
            myinfo:[],
            username:'',
            usernum:'',
            sex:'',
            admission:'',
            emali:'',
            token:'',
            cenreg:'',
            password:'',
            telphoto:'',
            uid:'',
            myreqname:'',
        }
    },
    //
 
    //
    methods:{
        //活动申请
        opendialogac(){
            this.rulename=this.item.username;
            this.$refs.myactivereq.opendialoga(true,JSON.parse(JSON.stringify(this.rulename)));
        },
         //福利申请
        opendialogmyreq(){
            this.myreqname=this.item.username;
            // this.$refs.mywreq.openmywreq(true,JSON.parse(JSON.stringify(this.myreqname)));
            this.$refs.mywreq.openmywreq(true,JSON.parse(JSON.stringify(this.myreqname)));
        },
        //修改
        upmyinfo(){
            var uid=this.uid;
            this.$refs.upmyinfo.opendialog(true,JSON.parse(JSON.stringify(uid)));
        },
        //
        getdata(){
            this.name=this.item.username;
            let params={
                username:this.name
            }
        this.$http.post("/api/selectmyinfo", params).then(res => {
        this.load = false;
        if (res.data) {
          this.myinfo = res.data;
        for(var i = 0; i < this.myinfo.length; i++){
            this.uid=this.myinfo[i].id,
            this.username=this.myinfo[i].username,
            this.usernum=this.myinfo[i].usernum,
            this.password=this.myinfo[i].password,
            this.sex=this.myinfo[i].sex,
            this.telphoto=this.myinfo[i].telphoto,
            this.emali=this.myinfo[i].emali,
            this.token=this.myinfo[i].token,
            this.cenreg=this.myinfo[i].cenreg,
            this.admission=this.myinfo[i].admission
        }
        if(this.sex=='1'){
            this.sex='男'
        }else{
            this.sex='女'
        }
        if(this.admission=='1'){
            this.admission='已缴纳'
        }
        else{
            this.admission='未缴纳'
        }
        }
          else {
          this.$message({
            showClose: true,
            message: "错误",
            type: "error"
          });
        }
      });
        }
    },
    mounted(){
         this.item.username=sessionStorage.getItem("username"); 
    },
}
</script>
<style scoped>
.data_main{
    width: 800px;
    overflow: hidden;
    height: 350px;
    background:#E0FFFF;
    margin-left: 300px;
    float: left;
}

.find{
    margin: 15px;
    padding: 0;
    border: 0;
    background:	#E0FFFF;
    color: #050505;
    height: 280px;
    width: 30px;
    font-family: '宋体';
    font-size: 20px;
    float: left;
}
.find:hover{
    font-weight: bold
}
.data_show{
    
    width: 600px;
    float: left;
    display: flex;
    flex-direction:inherit;
    text-align: center;
}
h1{
    margin-left: -150px;
    font-family: '宋体';
    font-size: 25px;
}
.btn{
    margin-left: 400px;
    position: relative;
}
span{
    font-family: '宋体';
    font-size: 20xp;
    font-weight: bold;
    margin-bottom: 20px;
}
.frist_4{
    width: 200px;
    display: flex;
    float: left;
    flex-direction: column;
    justify-content: center;
}
.last_4{
    width: 200px;
    display: flex;
    float: left;
    flex-direction: column;
    justify-content: center;
    margin-left: 100px;
}
</style>