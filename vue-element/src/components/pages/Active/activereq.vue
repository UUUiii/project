<template>
  <div>
    <div class="data-show">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 722px"
        height="400px"
        border
      >
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
            <el-button @click="upcode(scope.row)" type="primary" size="medium" class="btn1">通过</el-button>
            <div class="btn">
              <el-button @click=" unupcode(scope.row)" type="primary" size="medium">驳回</el-button>
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
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      load: false,
      tableData: [{}],
      columnList: [
        { prop: "rname", label: "活动名称", width: "140", fixed: "fixed" },
        { prop: "rusername", label: "申请人", width: "160" },
        { prop: "rconcent", label: "申请内容", width: "160" },
        { prop: "rcode", label: "现况", width: "160" }
      ],
      query: {
        rname: "",
        rusername: "",
        rconcent: "",
        rcode: ""
      }
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getData() {
      this.load = true;
      this.$http.get("/api/getreq").then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].rcode == "1") {
              this.tableData[i].rcode = "已通过";
            } else if (this.tableData[i].rcode == "0") {
              this.tableData[i].rcode = "待通过";
            } else if (this.tableData[i].rcode == "2") {
              this.tableData[i].rcode = "未通过";
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
    upcode(row) {
      if (
        row.rcode == "待通过" ||
        row.rcode == "已通过" ||
        row.rcode == "未通过"
      ) {
        row.rcode = 1;
        this.$http
          .post("/api/upreq", {
            rcode: row.rcode
          })
          .then(res => {
            location.reload([true]);
          });
      }
    },

    //
    unupcode(row) {
      if (
        row.rcode == "待通过" ||
        row.rcode == "已通过" ||
        row.rcode == "未通过"
      ) {
        row.rcode = 2;
        this.$http
          .post("/api/unupreq", {
            rcode: row.rcode
          })
          .then(res => {
            location.reload([true]);
          });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style  scoped>
.data-show {
  margin-left: 500px;
  margin-top: 100px;
}
.btn {
  margin-top: 2px;
  position: relative;
}

.btn2 {
  position: relative;
}
</style>