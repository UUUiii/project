<template>
    <div>
      <span class="user-add">
        <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增</el-button>
      </span>
        <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
         style="width: 850px" height="500" border>
          <el-table-column fixed label="序号" min-width="10%"  width="120px" align="center">
       <template slot-scope="scope">
         <span>{{scope.$index+1}}</span>
       </template>
      </el-table-column>
          <el-table-column label="编号" prop="uid" v-if="false"></el-table-column>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="del(scope.row)" type="primary" size="medium" class="btn1">删除</el-button>
              <div class="btn">
                <el-button @click=" upinfo(scope.row)" type="primary" size="medium" >修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]"
                            :page-size="pagesize" 
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">    
                    </el-pagination>
      </div>

      <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" width="20%" >
      <el-form :inline="true" label-width="80px" label-position="right"  :model="query"  ref="query" >
        <el-form-item label="ID" prop="uid" style="display:none">
          <el-input autocomplete="off" v-model="query.uid" style="display:none"></el-input>
        </el-form-item>
       <el-form-item label="用户姓名" required prop="username" label-width="100px">
          <el-select v-model="query.username" placeholder="请选择" >
                <el-option
                v-for="item in options12"
                :key="item.username"
                :label="item.username"
                :value="item.username">
                </el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="福利" required prop="awardinfo" label-width="100px">
            <el-select v-model="query.awardinfo" placeholder="请选择" >
                <el-option
                v-for="item in options"
                :key="item.wconcent"
                :label="item.wconcent"
                :value="item.wconcent">
                </el-option>
            </el-select>
          </el-form-item> 

      </el-form>
      <div slot="footer" class="dialog-footer"> 
         <el-button type="primary" @click="addinfo('query')">确 定</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
      
      </div>
    </el-dialog>

            <upuserinfo ref="upuserinfo"></upuserinfo>
    </div>
</template>
 <script>
import upuserinfo from '@/components/pages/User/upuserinfo'
export default { 
       components:{
            upuserinfo
       },
       name:'userinfo',
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      load: false,
      tableData: [{}],
     addFormVisible:false,
      columnList: [
        { prop: "username", label: "成员名称", width: "200" },
        { prop: "awardinfo", label: "福利", width: "260" },
         { prop: "status", label: "状态", width: "160" },
       
      ],
      query: {
          id:'',
        uid: "",
        username: "",
        awardinfo: "",
       status: "",
      },
      multipleSelection: [],
      options:[],
      options12:[]
    };
  },
  mounted() {
    this.getData();
    this.getaward(); 
    this.getuser();
  },
  methods: {
     //
       getuser(){
        this.$http.get("/api/getuser").then(res=>{
            this.options12=res.data
            // console.log(this.options)
        })
      },
    //
      getaward(){
        this.$http.get("/api/getward").then(res=>{
            this.options=res.data
            // console.log(this.options)
        })
      },
       // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
    //增
    addinfo(){
             this.$refs["query"].validate(valid => {
        if (valid) {
          let params = {
            
            username: this.query.username,
            awardinfo:this.query.awardinfo,
          };
          this.$http.post("/api/adduserinfo", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              })
            location.reload([true])
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
    //删除
    del(row) {
      this.$http
        .post("/api/deluserinfo", {
          uid: row.uid
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //
    upinfo(row) 
    {
            this.$refs.upuserinfo.openDialog(
            true,row
            // JSON.parse(JSON.stringify(row))
            )       
          //  console.log(row)
    },
    
    getData() {
      let params = {
        uid: this.query.aid,
        username: this.query.username,
        awardinfo: this.query.awardinfo,
        status: this.query.status,
      };
      this.load = true;
      this.$http.get("/api/getuserinfo", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
             for(var i=0;i<this.tableData.length;i++){
               if(this.tableData[i].status=="1"){
                 this.tableData[i].status="已用"
               }else if(this.tableData[i].status=="0"){
                 this.tableData[i].status="未使用"
               }else if(this.tableData[i].status=="2"){
                 this.tableData[i].status="永久"
               }
             }
        } else {
          this.$message({
            showClose: true,
            message: "错误",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.data-show{
    margin-left: 500px;
}
</style>