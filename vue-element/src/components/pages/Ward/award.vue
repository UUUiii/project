<template>
  <div >
      <div class="data-show">
        <el-table 
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 800px" height="500" border>
         <el-table-column fixed label="序号" min-width="10%"  width="120px" align="center">
       <template slot-scope="scope">
         <span>{{scope.$index+1}}</span>
       </template>
      </el-table-column>
          <el-table-column label="编号" prop="wid" v-if="false"></el-table-column>
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
    
           <upward ref="upward"></upward>
  </div>
</template>

 <script>
// import adduser from "@/pages/User/adduser";
import upward from '@/components/pages/Ward/upward'

export default { 
  components :{
        upward
      }, 
       name:'active',
  data() {
    return {
        currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      load: false,
      tableData: [{}],
     
      columnList: [
        { prop: "wconcent", label: "福利内容", width: "200" },
        { prop: "wrequire", label: "福利要求", width: "300" },
      ],
      query: {
        aid: "",
        wconcent: "",
        wrequire: "",
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
    //删除
    del(row) {
      this.$http
        .post("/api/delwardServer", {
          wid: row.wid
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
            this.$refs.upward.openDialog(
            true,row
            // JSON.parse(JSON.stringify(row))
            )       
            // console.log(row)
    },
    //
    //
    // user() {
    //   this.$router.push("/user");
    // },
    // loginout() {
    //   this.$router.push("/login");
    // },
    //时间转化
//   convertUTCTimeToLocalTime:function (UTCDateString) {
//         if(!UTCDateString){
//           return '-';
//         }
//         function formatFunc(str) {    //格式化显示
//           return str > 9 ? str : '0' + str
//         }
//         var date2 = new Date(UTCDateString);     //这步是关键
//         var year = date2.getFullYear();
//         var mon = formatFunc(date2.getMonth() + 1);
//         var day = formatFunc(date2.getDate());
//         var hour = date2.getHours();
//       //  hour = formatFunc(hour);
//         var min = formatFunc(date2.getMinutes());
//         var ss=formatFunc(date2.getSeconds());
//         var dateStr = year+'-'+mon+'-'+day+' '+ hour+':'+min+':'+ss;
//         return dateStr;
//         },
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
  }
};
</script>
 <style lang="scss" scoped>

.data-show {
  margin-left: 500px;
  margin-top: 100px;
}
.btn {
  margin-top: 2px;
  position: relative;
 overflow: hidden;
}

.btn2{
  position: relative;
}

</style>>
  


 