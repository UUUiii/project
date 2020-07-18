<template>
    <div class="up-active">
          <!-- 修改 -->
    <el-dialog  title="修改" :visible.sync="upinfoVisible" width="40%">
     <el-form :model="ruleForm"  ref="ruleForm"   class="demo-ruleForm" > 
     <el-form-item label="ID" prop="uid" style="display:none">
          <el-input autocomplete="off" v-model="ruleForm.uid" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" required prop="username" label-width="100px">
          <el-select v-model="ruleForm.username" placeholder="请选择" >
                <el-option
                v-for="item in options12"
                :key="item.username"
                :label="item.username"
                :value="item.username">
                </el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="福利" required prop="awardinfo" label-width="100px">
            <el-select v-model="ruleForm.awardinfo" placeholder="请选择" >
                <el-option
                v-for="item in options"
                :key="item.wconcent"
                :label="item.wconcent"
                :value="item.wconcent">
                </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="状态" label-position="right" label-width="100px">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="1">已用</el-radio>
            <el-radio label="0">未使用</el-radio>
            <el-radio label="2">永久</el-radio>
          </el-radio-group>
        </el-form-item>   
        <el-form-item>
    <el-button type="primary" @click="upinfo('ruleForm')">修改</el-button>
    <el-button @click="upinfoVisible=false">关闭</el-button>
  </el-form-item>
     </el-form>
          </el-dialog>
    </div>
</template>
<script>
export default {
    name:'upuserinfo',
    data(){
        return{
          wstatus:'',
            ruleForm:{
            username: '',
            uid: '',
            status:'',
            awardinfo:''
            },
            upinfoVisible:false,
            options:[],
            options12:[]
    };
    },
    methods: {
           
        //父传子
        openDialog(flag,val){
            this.upinfoVisible=flag
            this.ruleForm.uid=val.uid;
            this.ruleForm.username=val.username;
            this.ruleForm.awardinfo=val.awardinfo; 
            if(val.status=="已用"){
             this.wstatus= "1"
            }else if(val.status=="未使用"){
                this.wstatus="0"
            }else if(val.status=="永久"){
                this.wstatus="2"
            }
            this.ruleForm.status=this.wstatus;
          
        },
        //修改  
        upinfo(){
        this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let params = {
              uid:this.ruleForm.uid,
            username: this.ruleForm.username,
            awardinfo:this.ruleForm.awardinfo,
            status: this.ruleForm.status,
          };
          this.$http.post("/api/upuserinfo", params).then(res => {
            
            if (res.data) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              }),
              this.upinfoVisible=false
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
      getaward(){
        this.$http.get("/api/getward").then(res=>{
            this.options=res.data
            // console.log(this.options)
        })
      },
      //
       getuser(){
        this.$http.get("/api/getuser").then(res=>{
            this.options12=res.data
            // console.log(this.options)
        })
      },
    },
   mounted(){
       this.getaward();
       this.getuser();
   }
}
</script>

<style scoped>
.up-active{
    
  margin-left: 600px;
}
</style>