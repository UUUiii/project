<template>
  <div >
      <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
        style="width: 1100px" height="700" border>
         <el-table-column fixed label="序号" min-width="10%"  width="150px" align="center">
       <template slot-scope="scope">
         <span>{{scope.$index+1}}</span>
       </template>
      </el-table-column>
          <el-table-column label="编号" prop="aid" v-if="false"></el-table-column>
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
                <el-button @click=" updata(scope.row)" type="primary" size="medium" >修改</el-button>
                <span class="btn2">
                <el-button @click="acdetails(scope.row)" type="primary" size="medium">详情</el-button>
                </span> 
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
           <acupdata ref="acupdata"></acupdata>
           <activedetails ref="activedetails"></activedetails>
  </div>
</template>

 <script>
// import adduser from "@/pages/User/adduser";
import acupdata from '@/components/pages/Active/acupdata'
import activedetails from '@/components/pages/Active/activedetails'
export default { 
  components :{
          acupdata,
          activedetails
      }, 
       name:'active',
  data() {
    return {
        currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      load: false,
      tableData: [{}],
     
      columnList: [
        { prop: "aname", label: "通知标题", width: "200" },
        { prop: "activedatestart", label: "活动开始时间", width: "200" },
        { prop: "activedateend", label: "活动结束时间", width: "200" },
        { prop: "activetype", label: "类型", width: "200" }
      ],
      query: {
        aid: "",
        aname: "",
        acontent: "",
        activedatestart: "",
        activedateend:"",
        activetype:''
      },
      multipleSelection: []
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
    //时间转化
     xzrq(val){
          this.ruleForm.activedate=val;
          // console.log(val)
          // console.log(this.ruleForm.activedate)
      },
    //删除
    del(row) {
      this.$http
        .post("/api/delactive", {
          aid: row.aid
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //
    acdetails(row){
      this.$refs.activedetails.opendialog(true,row)
    },

    //
    updata(row) 
    {
            this.$refs.acupdata.openDialog(
            true,row
            // JSON.parse(JSON.stringify(row))
            )       
            // console.log(row)
    },
    //时间转化
  convertUTCTimeToLocalTime:function (UTCDateString) {
        if(!UTCDateString){
          return '-';
        }
        function formatFunc(str) {    //格式化显示
          return str > 9 ? str : '0' + str
        }
        var date2 = new Date(UTCDateString);     //这步是关键
        var year = date2.getFullYear();
        var mon = formatFunc(date2.getMonth() + 1);
        var day = formatFunc(date2.getDate());
        var hour = date2.getHours();
      //  hour = formatFunc(hour);
        var min = formatFunc(date2.getMinutes());
        var ss=formatFunc(date2.getSeconds());
        var dateStr = year+'-'+mon+'-'+day+' '+ hour+':'+min+':'+ss;
        return dateStr;
        },
    //
    getData() {
      this.load = true;
      this.$http.get("/api/getinfrom").then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].activetype == "1") {
              this.tableData[i].activetype = "活动";
            } else if (this.tableData[i].activetype == "0") {
              this.tableData[i].activetype = "通知";
            }
            if(1){
              this.tableData[i].activedatestart=this.convertUTCTimeToLocalTime(this.tableData[i].activedatestart)
              this.tableData[i].activedateend=this.convertUTCTimeToLocalTime(this.tableData[i].activedateend)
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
 <style lang="scss" scoped>

.data-show {
  margin-left: 200px;
  margin-top: 100px;
}
.btn {
  margin-top: 2px;
  position: relative;
 
}

.btn2{
  position: relative;
}

</style>>
  


 