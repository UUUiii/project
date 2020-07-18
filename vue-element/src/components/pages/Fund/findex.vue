<template>
  <div>
    <table class="table_style">
      <tr>
        <td>剩余资金</td>
        <td>收入和</td>
        <td>消费和</td>
      </tr>
      <tr>
        <td>{{sumicome-sumexpend}}</td>
        <td>{{sumicome}}</td>
        <td>{{sumexpend}}</td>
      </tr>
    </table>
    <span></span>
    <el-main>
      <el-scrollbar>
        <el-row :gutter="20">
          <el-col :span="12" class="echarts-item">
            <el-card>
              <div class="content-title">消费情况</div>
              <ve-pie :data="picData"></ve-pie>
            </el-card>
          </el-col>
          <el-col :span="12" class="echarts-item">
            <el-card>
              <div class="content-title">收支情况</div>
              <ve-ring :data="ringChartData"></ve-ring>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-main>
  </div>
</template>

<script>
import Vue from "vue";
import VCharts from "v-charts";
Vue.use(VCharts);
export default {
  name: "Dashboard",
  data() {
    //饼状图设置
    pieChartSettings: {
      dimension: "消费";
      metrics: "资金";
    }
    //环形图设置
    ringChartSettings: {
      dimension: "消费";
      metrics: "资金";
    }
    return {
      //
      sumaepen: "",
      sumpexend: "",
      sumexpend: "",
      sumwepxend: "",
      sumawpexend: "",
      summoney: "",
      sumicome: "",
      sumcostin: "",
      admissions: "",
      aidcost: "",
      costinput: "",
      aexpenditrue: "",
      wexpenditrue: "",
      pexpenditrue: "",
      awexpenditrue: "",
      activename: "",
      tableData: [],
      tableData1: [],
      picData: {
        columns: ["消费", "资金"],
        rows: []
      },
      //
      sumData: [{}],
      //环形图
      ringChartData: {
        columns: ["收支", "资金"],
        rows: []
      }
    };
  },
  created: function() {},

  //
  methods: {
    //

    getincome() {
      let params = {
        admissions: this.admissions,
        aidcost: this.aidcost,
        costinput: this.costinput
      };
      this.load = true;
      this.$http.get("/api/getincome", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData1 = res.data;
          this.sumcostin = 0;
          this.sumaidin = 0;
          this.sumadmin = 0;
          for (var i = 0; i < this.tableData1.length; i++) {
            this.sumcostin += this.tableData1[i].costinput;
            this.sumaidin += this.tableData1[i].aidcost;
            this.sumadmin += this.tableData1[i].admissions;
          }
          this.sumicome = this.sumcostin + this.sumaidin + this.sumadmin;
          this.ringChartData.rows.push(
            {
              收支: "工会费缴纳",
              资金: this.sumadmin
            },
            {
              收支: "赞助费",
              资金: this.sumaidin
            },
            {
              收支: "公司投入资金",
              资金: this.sumcostin
            }
          );
          this.sumicome = this.sumcostin + this.sumaidin + this.sumadmin;
        } else {
          this.$message({
            showClose: true,
            message: "错误",
            type: "error"
          });
        }
      });
    },
    getcapital() {
      let params = {
        activename: this.activename,
        aexpenditrue: this.aexpenditrue,
        awexpenditrue: this.awexpenditrue,
        pexpenditrue: this.pexpenditrue,
        wexpenditrue: this.wexpenditrue
      };
      this.load = true;
      this.$http.get("/api/getcapital", params).then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          this.sumaepen = 0;
          this.sumpexend = 0;
          this.sumwepxend = 0;
          this.sumawpexend = 0;
          for (var i = 0; i < this.tableData.length; i++) {
            this.sumaepen += this.tableData[i].aexpenditrue;
            this.sumpexend += this.tableData[i].pexpenditrue;
            this.sumwepxend += this.tableData[i].wexpenditrue;
            this.sumawpexend += this.tableData[i].awexpenditrue;
          }
          this.sumexpend =
            this.sumaepen + this.sumpexend + this.sumwepxend + this.sumawpexend;
          this.picData.rows.push(
            {
              消费: "活动经费",
              资金: this.sumaepen
            },
            {
              消费: "场地经费",
              资金: this.sumpexend
            },
            {
              消费: "福利经费",
              资金: this.sumwepxend
            },
            {
              消费: "奖励经费",
              资金: this.sumawpexend
            }
          );
          this.sumpexend =
            this.this.sumaepen +
            this.sumpexend +
            this.sumwepxend +
            this.sumawpexend;
        } else {
          this.$message({
            showClose: true,
            message: "错误",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    this.getincome();
    this.getcapital();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  padding: 10px 10px;
  font-size: 21px;
  color: black;
  border-radius: 1px;
  border: 1px solid #ebeef5;
}
.table_style {
  border: 1px solid gainsboro;
  margin-left: 100px;
}
td,
tr {
  border: 1px solid gray;
  font-size: 20px;
  font-family: "宋体";
}
</style>