<template>
  <div >
       <span class="user-add">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    <br>
        <span>总消耗资金： {{this.sum}}</span>
      </span>
      <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
        style=" width:1200px" height="655" border>
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
        <el-form-item label="消费用途" required prop="activename" label-width="100px">
          <el-input autocomplete="off" v-model="query.activename"></el-input>
        </el-form-item>
        <el-form-item label="活动经费"  label-width="80px" prop="aexpenditrue">
           <el-input autocomplete="off" v-model="query.aexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>   
        <el-form-item label="场地经费"  label-width="80px" prop="pexpenditrue">
            <el-input autocomplete="off" v-model="query.pexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="福利经费" required prop="wexpenditrue">
          <el-input autocomplete="off" v-model="query.wexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="奖励经费" required prop="awexpenditrue">
          <el-input autocomplete="off" v-model="query.awexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="消费时间" required prop="activetime">
          <el-input autocomplete="off" v-model="query.activetime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcapital('query')">确 定</el-button>
      </div>
    </el-dialog>


       <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="upFormVisible" width="20%" >
      <el-form :inline="true" label-width="80px" label-position="right"  :model="upfrom"  ref="upfrom" :rules="rules">
        <el-form-item label="ID" prop="fid" style="display:none">
          <el-input autocomplete="off" v-model="query.fid" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="消费用途" required prop="activename" label-width="100px">
          <el-input autocomplete="off" v-model="upfrom.activename"></el-input>
        </el-form-item>
        <el-form-item label="活动经费"  label-width="80px" prop="aexpenditrue">
           <el-input autocomplete="off" v-model="upfrom.aexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>   
        <el-form-item label="场地经费"  label-width="80px" prop="pexpenditrue">
            <el-input autocomplete="off" v-model="upfrom.pexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="福利经费" required prop="wexpenditrue">
          <el-input autocomplete="off" v-model="upfrom.wexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="奖励经费" required prop="awexpenditrue">
          <el-input autocomplete="off" v-model="upfrom.awexpenditrue" placeholder="若无，请输入'0'"></el-input>
        </el-form-item>
        <el-form-item label="消费时间" required prop="activetime">
          <el-input autocomplete="off" v-model="upfrom.activetime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upcapital('query')">确 定</el-button>
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
      dialogFormVisible: false,
       currentPage:1, //初始页
      pagesize:10,    //    每页的数据
     upFormVisible:false,
      tableData: [{}],
      columnList: [
        { prop: "fid", label: "资金编号", width: "120", },
        { prop: "activename", label: "消费用途", width: "140" },
        { prop: "aexpenditrue", label: "活动经费", width: "140" },
        { prop: "pexpenditrue", label: "场地经费", width: "140" },
        { prop: "wexpenditrue", label: "福利经费", width: "160" },
        { prop: "awexpenditrue", label: "奖励经费", width: "180" },
        { prop: "activetime", label: "消费时间", width: "180" },
      ],
      query: {
        fid: "",
        activename: "",
        aexpenditrue: "",
        pexpenditrue: "",
        wexpenditrue: "",
        awexpenditrue: "",
        activetime:''
      },
        upfrom: {
        fid: "",
        activename: "",
        aexpenditrue: "",
        pexpenditrue: "",
        wexpenditrue: "",
        awexpenditrue: "",
        activetime:''
      },
        sum:'',
      multipleSelection: [],
      rules:{ 
          aexpenditrue:
          [{
              required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur" 
          }],
          pexpenditrue:
          [{
               required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur"
          }],
         wexpenditrue:
          [{
               required: true,
            pattern:/^(0|\+?[1-9][0-9]*)$/,
            message: "若没有消耗请输入数字'0'",
            trigger: "blur"
          }],
           awexpenditrue:
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
        activename: this.query.activename,
        aexpenditrue: this.query.aexpenditrue,
        awexpenditrue: this.query.awexpenditrue,
        pexpenditrue:this.query.pexpenditrue,
        wexpenditrue: this.query.wexpenditrue,
        activetime: this.query.activetime
      };
        this.$http.post("/api/addcapital", params).then(res => {
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
        .post("/api/delcapital", {
          fid: row.fid
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //修改
    updata(row) {
      this.upFormVisible=true;  
      this.upfrom.fid=row.fid;
        this.upfrom.activename=row.activename;
        this.upfrom.aexpenditrue=row.aexpenditrue;
        this.upfrom.pexpenditrue=row.wexpenditrue;
        this.upfrom.awexpenditrue=row.awexpenditrue;
        this.upfrom.activetime=row.activetime;
        this.upfrom.wexpenditrue=row.wexpenditrue;
    },

    upcapital(){
         this.$refs["upfrom"].validate(valid => {
        if (valid) {
          let params = {
          fid: this.upfrom.fid,
        activename: this.upfrom.activename,
        aexpenditrue: this.upfrom.aexpenditrue,
        awexpenditrue: this.upfrom.awexpenditrue,
        pexpenditrue:this.upfrom.pexpenditrue,
        wexpenditrue: this.upfrom.wexpenditrue,
        activetime: this.upfrom.activetime
          };
          this.$http.post("/api/upcapital", params).then(res => {
            
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
        fid: this.query.fid,
        activename: this.query.activename,
        aexpenditrue: this.query.aexpenditrue,
        awexpenditrue: this.query.awexpenditrue,
        pexpenditrue:this.query.pexpenditrue,
        wexpenditrue: this.query.wexpenditrue,
        activetime: this.query.activetime
      };
      this.load = true;
      this.$http.get("/api/getcapital", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          this.sum=0
          for (var i = 0; i < this.tableData.length; i++) {
           this.sum=this.tableData[i].aexpenditrue+this.tableData[i].awexpenditrue+this.tableData[i].pexpenditrue+this.tableData[i].wexpenditrue+this.sum
          }
          console.log()
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
  margin-left: 300px;
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
  


 