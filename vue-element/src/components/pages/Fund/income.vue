<template>
  <div >
       <span class="user-add">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    <br>
        <span>总收入资金： {{this.sum}}</span>
      </span>
      <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style=" width:900px" height="655" border>
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
          <el-table-column label="操作" > 
            <template slot-scope="scope">  
                <el-button @click="del(scope.row)" type="primary" size="medium">删除</el-button>
              <div class="btn">
                <el-button @click="updata(scope.row)" type="primary" size="medium" >修改</el-button>
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
    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="20%" >
      <el-form :inline="true" label-width="80px" label-position="right"  :model="query"  ref="query" :rules="rules">
        <!-- <el-form-item label="ID" prop="fid" style="display:none">
          <el-input autocomplete="off" v-model="query.fid" style="display:none"></el-input>
        </el-form-item> -->
        <el-form-item label="工会费缴纳" required prop="admissions" label-width="100px">
          <el-input autocomplete="off" v-model="query.admissions"></el-input>
        </el-form-item>
        <el-form-item label="赞助费"  label-width="80px" prop="aidcost">
           <el-input autocomplete="off" v-model="query.aidcost" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>   
        <el-form-item label="公司投入资金"  label-width="120px" prop="costinput">
            <el-input autocomplete="off" v-model="query.costinput" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
          <el-form-item label="收入时间"  label-width="120px" prop="incomedate">
            <el-input autocomplete="off" v-model="query.incomedate" placeholder="请输入时间'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcapital('query')">确 定</el-button>
      </div>
    </el-dialog>


       <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="upFormVisible" width="28%" >
      <el-form :inline="true" label-width="80px" label-position="right"  :model="upfrom"  ref="upfrom" :rules="rules">
        <el-form-item label="ID" prop="cid" style="display:none">
          <el-input autocomplete="off" v-model="query.cid" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="工会费缴纳" required prop="admissions" label-width="100px">
          <el-input autocomplete="off" v-model="upfrom.admissions"></el-input>
        </el-form-item>
        <el-form-item label="赞助费"  label-width="80px" prop="aidcost">
           <el-input autocomplete="off" v-model="upfrom.aidcost" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>   
        <el-form-item label="公司投入资金"  label-width="120px" prop="costinput">
            <el-input autocomplete="off" v-model="upfrom.costinput" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
          <el-form-item label="收入时间"  label-width="120px" prop="incomedate">
            <el-input autocomplete="off" v-model="upfrom.incomedate" placeholder="请输入时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">  
          <el-button type="primary" @click="upcapital('query')">确 定</el-button>
        <el-button @click="upFormVisible = false">取 消</el-button>
      
      </div>
    </el-dialog>
  </div>
</template>

 <script>
// import adduser from "@/pages/User/adduser";
export default {
  data() {    
    return {
      name:'user',
       currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      dialogFormVisible: false,
     upFormVisible:false,
      tableData: [{}],
      columnList: [
        { prop: "cid", label: "资金编号", width: "150", },
        { prop: "admissions", label: "工会费缴纳", width: "150" },
        { prop: "aidcost", label: "赞助费", width: "150" },
        { prop: "costinput", label: "公司投入资金", width: "150" },
         { prop: "incomedate", label: "收入时间", width: "200" },
      ],
      query: {
        cid: "",
        admissions: "",
        aidcost: "",
        costinput: "",
       incomedate:'',
      },
        upfrom: {
       cid: "",
        admissions: "",
        aidcost: "",
        costinput: "",
       incomedate:''
      },
        sum:'',
      multipleSelection: [],
      rules:{ 
          admissions:
          [{
              required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur" 
          }],
          aidcost:
          [{
               required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur"
          }],
         costinput:
          [{
               required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur"
          }],
        
          }
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
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
      addcapital(){
             let params = {
        admissions: this.query.admissions,
        aidcost: this.query.aidcost,
        costinput: this.query.costinput,
        incomedate:this.query.incomedate
      };
        this.$http.post("/api/addincome", params).then(res => {
        this.load = false;
        if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              }),
              this.dialogFormVisible=false
              location.reload([true])
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
    //删除
    del(row) {
      this.$http
        .post("/api/delincome", {
          cid: row.cid
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //父传子
    updata(row) {
      this.upFormVisible=true;  
      this.upfrom.cid=row.cid;
        this.upfrom.admissions=row.admissions;
        this.upfrom.aidcost=row.aidcost;
        this.upfrom.costinput=row.costinput;
        this.upfrom.incomedate=row.incomedate
    },
//修改
    upcapital(){
         this.$refs["upfrom"].validate(valid => {
        if (valid) {
          let params = {
          cid: this.upfrom.cid,
       admissions: this.upfrom.admissions,
        aidcost: this.upfrom.aidcost,
        costinput: this.upfrom.costinput,
        incomedate:this.upfrom.incomedate
          };
          this.$http.post("/api/upincome", params).then(res => {
            
            if (res.data) {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              }),
              this.upFormVisible=false
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
    getData() {
      let params = {
        cid: this.upfrom.cid,
       admissions: this.upfrom.admissions,
        aidcost: this.upfrom.aidcost,
        costinput: this.upfrom.costinput,
        incomedate:this.upfrom.incomedate
      };
      this.load = true;
      this.$http.get("/api/getincome", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          this.sum=0
          for (var i = 0; i < this.tableData.length; i++) {
           this.sum=this.tableData[i].admissions+this.tableData[i].aidcost+this.tableData[i].costinput+this.sum
          }
        //   console.log()
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
  }
};
</script>
 <style lang="scss" scoped>


.data-show {
  margin-left: 500px;
  margin-top: 100px;
}
.user-add {
  padding-left: 60px;
}
.btn {
  margin-top: 2px;
  position: relative;
}
</style>>
  


 