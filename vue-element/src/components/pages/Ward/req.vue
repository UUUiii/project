<template>
    <div>
           <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
        style="width: 1150px" height="400px" border>
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
              <el-button @click="upwcode(scope.row)" type="primary" size="medium" class="btn1">通过</el-button>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
           currentPage:1, //初始页
      pagesize:10,    //    每页的数据
        load: false,
      tableData: [{}],
      columnList: [
        { prop: "rwname", label: "申请福利内容", width: "140", fixed: "fixed" },
        { prop: "rwusername", label: "申请人", width: "160" },
        { prop: "rwconcent", label: "工作资历", width: "550" },
        { prop: "wcode", label: "现况", width: "160" },
      ],
      query: {
         rwname: "",
        rwusername: '',
        rwconcent: '',
        wcode: '',
      
      },    
        }
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
        getData() {
      let params = {
        rwname: this.query.rwname,
        rwusername: this.query.rwusername,
        rwconcent: this.query.rwconcent,
        wcode: this.query.wcode,
       
      };
      this.load = true;
      this.$http.get("/api/getreqward", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].wcode == "1") {
              this.tableData[i].wcode = "已通过";
              
          }  else if(this.tableData[i].wcode == "0"){
              this.tableData[i].wcode = "未通过";
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
    upwcode(row){
        if(row.wcode=='待通过'||row.wcode=='已通过'||row.wcode=='未通过'){
            row.wcode=1
             this.$http
        .post("/api/upreqward", {
           wcode:row.wcode
        })
        .then(res => {
          let params={
            awardinfo:row.rwname,
            username:row.rwusername
          }
          this.$http.post("/api/adduserinfo",params).then(res=>{
            this.$router.push('/userinfo')
          })
        });
        }
    },
    },
    mounted() {
        this.getData();
    },
}
</script>
<style  scoped>
.data-show {
  margin-left: 400px;
  margin-top: 100px;
}
.btn {
  margin-top: 2px;
  position: relative;
 
}

.btn2{
  position: relative;
}
</style>