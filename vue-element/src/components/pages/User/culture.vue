<template>
  <div>
    <span class="user-add">
      <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增</el-button>
    </span>
    <div class="data-show">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 1050px"
        height="500"
        border
      >
        <el-table-column fixed label="序号" min-width="10%" width="120px" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="culid" v-if="false"></el-table-column>
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
              <el-button @click=" upinfo(scope.row)" type="primary" size="medium">修改</el-button>
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

    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" width="20%">
      <el-form :inline="true" label-width="80px" label-position="right" :model="query" ref="query">
        <el-form-item label="ID" prop="culid" style="display:none">
          <el-input autocomplete="off" v-model="query.culid" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input autocomplete="off" v-model="query.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <!-- <el-input v-model="query.image" type="file" @change="updata"></el-input>
          <el-button type="primery" @click="upload">上传</el-button>-->
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            @change="showfile"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="concent">
          <el-input autocomplete="off" v-model="query.concent"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input autocomplete="off" v-model="query.weight" placeholder="权重越高，排名越在前"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addinfo('query')">确 定</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <upculture ref="upculture"></upculture>
  </div>
</template>
 <script>
// import url from "@/http/http";
import upculture from "@/components/pages/User/upculture";
export default {
  components: {
    upculture
  },
  name: "culture",
  data() {
    return {
      imageUrl: {}, //子组件上传的信息
      fileList: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      load: false,
      imgurl: [],

      tableData: [{}],
      addFormVisible: false,
      columnList: [
        { prop: "title", label: "标题", width: "200" },
        { prop: "concent", label: "内容", width: "160" },
        { prop: "weight", label: "权重", width: "160" },
        { prop: "imgpath", label: "图片", width: "200" }
      ],
      query: {
        culid: "",
        id: "",
        concnet: "",
        imgpath: "",
        title: "",
        image: "",
        weight: ""
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.getData();
    // this.created();
  },
  methods: {
    // created() {
    //   this.url = url;
    // },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    showfile(file) {
      console.log(file);
      console.log(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        console.log("file 转 base64结果：" + reader.result);
        this.iconBase64 = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        console.log("file 转 base64结果：" + reader.result);
        this.iconBase64 = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },
    // updata() {
    //   // console.log(this.query.image);
    //   var reader = new FileReader();
    //   reader.readAsDataURL(this.query.image.raw);
    //   reader.onload = () => {
    //     console.log("file 转 base64结果：" + reader.result);
    //     this.iconBase64 = reader.result;
    //   };
    //   reader.onerror = function(error) {
    //     console.log("Error: ", error);
    //   };
    // },
    // upload() {},
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    //增
    addinfo() {
      this.$refs["query"].validate(valid => {
        if (valid) {
          let params = {
            title: this.query.title,
            imgpath: this.iconBase64,
            concent: this.query.concent,
            weight: this.query.weight
          };

          this.$http.post("/api/addculture", params).then(res => {
            if (res.data) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
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
    //删除
    del(row) {
      this.$http
        .post("/api/delculture", {
          culid: row.culid
        })
        .then(res => {
          location.reload([true]);
        });
    },
    //
    upinfo(row) {
      this.$refs.upculture.opendialog(
        true,
        row
        // JSON.parse(JSON.stringify(row))
      );
      //  console.log(row)
    },

    getData() {
      this.load = true;
      this.$http.get("/api/selectculture").then(res => {
        this.load = false;
        if (res.data) {
          this.tableData = res.data;
          // for (var i = 0; i < this.tableData.length; i++) {
          //   this.tableData[i].imgpath =
          //     "<img " + ":src=" + this.tableData[i].imgpath + "/>";
          // }
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
<style scoped>
.data-show {
  margin-left: 500px;
}
</style>