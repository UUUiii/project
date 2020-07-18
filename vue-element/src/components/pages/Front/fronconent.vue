<template>
  <div>
    <div class="data_active">活动展示</div>
    <div class="serch">
      <el-input type="text" placeholder="请输入所需内容" style="width:400px;" v-model="sconent" />
      <el-button type="primary" icon="el-icon-search" round @click="serchindex">搜索</el-button>
    </div>
    <hr />
    <div class="data-show">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style=" width:1200px"
        height="725"
      >
        <el-table-column fixed label="序号" min-width="10%" width="160px" align="center">
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
            <el-button @click="detais(scope.row)" type="primary" size="medium">查看详情</el-button>
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
        :total="tableData.length"
      ></el-pagination>
    </div>
    <div class="data_active">通知栏目</div>
    <hr />
    <div class="data-show1">
      <el-table
        :data="infromData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style=" width:1200px"
        height="425"
      >
        <el-table-column fixed label="序号" min-width="10%" width="180px" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="aid" v-if="false"></el-table-column>
        <el-table-column
          v-for="(item,index) in infromList"
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
            <el-button @click="detais(scope.row)" type="primary" size="medium">查看详情</el-button>
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
        :total="infromData.length"
      ></el-pagination>
    </div>
    <div class="page-index">
      <table>
        <tr>
          <td @click="backindex" class="on">首页</td>
        </tr>
        <tr>
          <td @click="unionculture">企业文化</td>
        </tr>
        <tr>
          <td @click="backreq">活动申请</td>
        </tr>
      </table>
    </div>

    <frontdetails ref="frontdetails"></frontdetails>
  </div>
</template>

 <script>
// import adduser from "@/pages/User/adduser";
import frontdetails from "@/components/pages/Front/frontdetails";
export default {
  components: {
    frontdetails
  },
  data() {
    return {
      name: "user",
      sconent: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      tableData: [{}],
      infromData: [{}],
      columnList: [
        { prop: "aname", label: "活动名称", width: "160" },
        { prop: "aplace", label: "活动地点", width: "160" },
        { prop: "acontent", label: "活动内容", width: "600" }
      ],
      infromList: [
        { prop: "aname", label: "活动名称", width: "200" },
        { prop: "acontent", label: "活动内容", width: "600" }
      ],
      query: {
        aid: "",
        aname: "",
        aplace: "",
        acontent: ""
      },

      multipleSelection: []
    };
  },
  mounted() {
    this.getData();
    this.getinfrom();
  },
  methods: {
    //搜索
    serchindex() {
      let params = {
        aname: this.sconent
      };
      this.$http.post("/api/serchserver", params).then(res => {
        // console.log(res);
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (1) {
              this.tableData[
                i
              ].activedatestart = this.convertUTCTimeToLocalTime(
                this.tableData[i].activedatestart
              );
              this.tableData[i].activedateend = this.convertUTCTimeToLocalTime(
                this.tableData[i].activedateend
              );
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
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    //
    backindex() {
      this.$router.push("/index");
    },
    //
    unionculture() {
      this.$router.push("/unionculture");
    },
    //
    backreq() {
      this.$router.push("/reqfront");
    },
    //
    detais(row) {
      this.$refs.frontdetails.openDialog(row);
    },
    //时间转化
    convertUTCTimeToLocalTime: function(UTCDateString) {
      if (!UTCDateString) {
        return "-";
      }
      function formatFunc(str) {
        //格式化显示
        return str > 9 ? str : "0" + str;
      }
      var date2 = new Date(UTCDateString); //这步是关键
      var year = date2.getFullYear();
      var mon = formatFunc(date2.getMonth() + 1);
      var day = formatFunc(date2.getDate());
      var hour = date2.getHours();
      //  hour = formatFunc(hour);
      var min = formatFunc(date2.getMinutes());
      var ss = formatFunc(date2.getSeconds());
      var dateStr =
        year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + ss;
      return dateStr;
    },
    //
    getData() {
      this.load = true;
      this.$http.get("/api/getactive").then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (1) {
              this.tableData[
                i
              ].activedatestart = this.convertUTCTimeToLocalTime(
                this.tableData[i].activedatestart
              );
              this.tableData[i].activedateend = this.convertUTCTimeToLocalTime(
                this.tableData[i].activedateend
              );
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
    },
    //
    getinfrom() {
      this.load = true;
      this.$http.get("/api/getinfrom").then(res => {
        this.load = false;
        if (res.data) {
          this.infromData = res.data;
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
.logo-font {
  line-height: 120px;
  height: 120px;
  text-align: right;
  font-family: "宋体";
  font-weight: bold;
  font-size: 20px;
  margin-left: 23px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  width: 20px;
}
.iphoto {
  float: left;
}

.backgound-photo {
  margin-left: 160px;
  padding-top: 40px;
}
.data-show {
  margin-left: 300px;
  margin-top: 20px;
  height: 800px;
}
.data-show1 {
  margin-left: 300px;
  margin-top: 20px;
  height: 400px;
}
.user-add {
  padding-left: 60px;
}
.btn {
  margin-top: 2px;
  position: relative;
}
.data_active {
  font-family: "宋体";
  font-weight: bold;
  font-size: 30px;
  margin-left: 200px;
  margin-top: 8px;
  width: 200px;
  text-align: center;
  background-color: bisque;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
}
.page-index {
  width: 130px;
  font-family: "宋体";
  font-size: 20px;
  color: white;
  background-color: coral;
  position: fixed;
  top: 600px;
}
table,
td {
  border: 1px solid whitesmoke;
  width: 130px;
  line-height: 30px;
}
td {
  padding: 10px;
  text-align: center;
}
td:hover {
  color: black;
  background-color: white;
}
.on {
  background-color: white;
  color: black;
}
</style>>
  


 