<template>
  <el-dialog :visible.sync="rwVisible" width="90%">
    <div class="data-show">
      <el-table :data="tableData" style="width: 1000px" height="200px" border>
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
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      rwVisible: false,
      rulename: "",
      tableData: [{}],
      columnList: [
        { prop: "rwname", label: "申请福利内容", width: "140", fixed: "fixed" },
        { prop: "rwusername", label: "申请人", width: "160" },
        { prop: "rwconcent", label: "工作资历", width: "538" },
        { prop: "wcode", label: "状态", width: "160" }
      ],
      query: {
        rwname: "",
        rwusername: "",
        rwconcent: "",
        wcode: ""
      }
    };
  },
  methods: {
    openmywreq(flag, val) {
      this.rwVisible = flag;
      this.rulename = val;
      let params = {
        rwusername: this.rulename
      };
      // console.log(params)
      this.$http.post("/api/getwardreq", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].wcode == "1") {
              this.tableData[i].wcode = "已通过";
            } else if (this.tableData[i].wcode == "0") {
              this.tableData[i].wcode = "待通过";
            } else if (this.tableData[i].wcode == "2") {
              this.tableData[i].wcode = "未通过";
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
    //     getData() {
    //   let params = {
    //     rwname: this.query.rwname,
    //     rwusername: this.query.rwusername,
    //     rwconcent: this.query.rwconcent,
    //     wcode: this.query.wcode,

    //   };
    //   this.load = true;
    //   this.$http.get("/api/getreqward", params).then(res => {
    //     this.load = false;
    //     if (res.data) {
    //       this.tableData = res.data;
    //       for (var i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].wcode == "1") {
    //           this.tableData[i].wcode = "已通过";
    //       }  else if(this.tableData[i].wcode == "0"){
    //            this.tableData[i].wcode = "待通过";
    //         }
    //         else if(this.tableData[i].wcode == "2"){
    //            this.tableData[i].wcode = "未通过";
    //         }
    //       }
    //     }
    //      else {
    //       this.$message({
    //         showClose: true,
    //         message: "错误",
    //         type: "error"
    //       });
    //     }
    //   });
    // }
  },
  mounted() {
    // this.getData();
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