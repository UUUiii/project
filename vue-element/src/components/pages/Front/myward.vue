<template>
    <div class="bgward">
        <div class="bgul">
            <span>我自己的目前福利:</span>
            <el-button @click="selw">查询</el-button>
            <el-button @click="reqw">申请</el-button>
            <br> 
            <ul>
              <span class="wardu">福利名称</span>  
             <ul class="wardui">状态</ul> 
            <div v-for="index in myward" :key="index.awardinfo" class="wardul">    
              <li style="list-style-image:url('/static/img/ward.png')" class="wardl">{{index.awardinfo}}</li> 
              <li style="list-style:none" class="wardli">{{index.status}}</li>     
            </div>
            </ul>
        </div>
    <div class="data-show">
        <el-table :data="tableData" style="width:602px"  border>
          <el-table-column
            v-for="(item,index) in columnList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sort"
            :fixed="item.fixed"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
      <reqmy ref="reqmy"></reqmy>
    </div>
</template>
<script>
import reqmy from '@/components/pages/Front/reqmy'
export default {
    components:{
        reqmy
    },
    data() {
        return {
            i:0,
            tableData:[],
            item:{username:null},
            infodata:[],
            uname:'',
            mname:'',
            myward:[{}],
          columnList: [
        { prop: "wconcent", label: "福利内容", width: "200" },
        { prop: "wrequire", label: "福利要求", width: "400" },
      ],
      query: {
        aid: "",
        wconcent: "",
        wrequire: "",
      },
        }
    },
    methods: {
        //
        reqw(){
          this.$refs.reqmy.opendialog(true)
        },
        selw(){
          this.mname=this.item.username;
          let params={
              username:this.mname
          }
        this.load = true;
      this.$http.post("/api/selectmyward", params).then(res => {
        this.load = false;
        if (res.data) {
          this.myward = res.data;
            for(var i=0;i<this.myward.length;i++){
               if(this.myward[i].status=="1"){
                 this.myward[i].status="已用"
               }else if(this.myward[i].status=="0"){
                 this.myward[i].status="未使用"
               }else if(this.myward[i].status=="2"){
                 this.myward[i].status="永久"
               }
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
        },
        //
        getData() {
      let params = {
        wid: this.query.wid,
        wconcent: this.query.wconcent,
        wrequire: this.query.wrequire,
      };
      this.load = true;
      this.$http.get("/api/getaward", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
        //    for (var i = 0; i < this.tableData.length; i++) {
        //        this.tableData[i].wid=i+1
        //    }
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
    mounted() {
        this.getData();
    // this.getinfo();
    //   this.items.username=sessionStorage.getItem("username"); 
    this.item.username=sessionStorage.getItem("username"); 
    },
}
</script>
<style  scoped>
.bgward{
  float: left;
  width: 100%;
  height: 800px;
  overflow-y: scroll;
}
.data-show{
  float: left;
  margin-left: 800px;
  width: 800px;
  position: fixed;
}
.bgul{
  width: 400px;
  float: left;
}
.wardul{
display: flex;
flex-direction: row;
 font-family: '宋体';
 
align-items: center;
}
.wardli{
  margin-left: 40px;
  margin-top: 20px;
  text-align: left;
  width: 100px;

}
.wardl{
  width: 120px;
  height: auto;
  white-space: nowrap;
 text-overflow: ellipsis;
}
.wardui{
  margin-top: -20px;
  margin-left: 120px;
  font-family: '宋体';
  font-weight: bold;
}
.wardu{
    font-family: '宋体';
  font-weight: bold;
}
</style>