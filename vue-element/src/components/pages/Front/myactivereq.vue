<template>
  <el-dialog :visible.sync="raVisible" width="80%">
    <div>
      <div class="data-show">
        <el-table :data="tableData" style="width: 622px" height="200px" border>
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
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      raVisible: false,
      tableData: [{}],
      rulename: "",
      columnList: [
        { prop: "rname", label: "活动名称", width: "140", fixed: "fixed" },
        { prop: "rusername", label: "申请人", width: "160" },
        { prop: "rconcent", label: "申请内容", width: "160" },
        { prop: "rcode", label: "状态", width: "160" }
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
    opendialoga(flag, val) {
      this.raVisible = flag;
      this.rulename = val;
      let params = {
        rulename: this.rulename
      };
      this.load = true;
      this.$http.post("/api/getuserreq", params).then(res => {
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
    }
    //     getData() {
    //   let params = {
    //       rusername:this.rulename
    //   };
    //   console.log(params)
    //   this.$http.post("/api/getuserreq", params).then(res => {
    //     this.load = false;
    //     if (res.data) {
    //       this.tableData = res.data;
    //           console.log(this.tableData)
    //       for (var i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].rcode == "1") {
    //           this.tableData[i].rcode = "已通过";
    //       }  else if(this.tableData[i].rcode == "0"){
    //            this.tableData[i].rcode = "待通过";
    //         }
    //         else if(this.tableData[i].rcode == "2"){
    //            this.tableData[i].rcode = "未通过";
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