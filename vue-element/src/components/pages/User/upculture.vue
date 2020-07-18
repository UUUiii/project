   <template>
  <!-- 新增 -->
  <el-dialog title="修改" :visible.sync="upFormVisible" width="20%">
    <el-form :inline="true" label-width="80px" label-position="right" :model="query" ref="query">
      <el-form-item label="ID" prop="culid" style="display:none">
        <el-input autocomplete="off" v-model="query.culid" style="display:none"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input autocomplete="off" v-model="query.title"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
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
      <el-button type="primary" @click="upcul('query')">确 定</el-button>
      <el-button @click="upFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template> 
<script>
export default {
  data() {
    return {
      upFormVisible: false,
      query: {
        culid: "",
        concent: "",
        imgpath: "",
        title: "",
        weight: ""
      }
    };
  },
  methods: {
    //
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
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
    //
    opendialog(flag, val) {
      this.upFormVisible = flag;
      this.query.culid = val.culid;
      this.query.title = val.title;
      this.query.concent = val.concent;
      this.query.weight = val.weight;
    },
    upcul() {
      let params = {
        culid: this.query.culid,
        title: this.query.title,
        concent: this.query.concent,
        imgpath: this.iconBase64,
        weight: this.query.weight
      };
      this.$http.post("/api/upculture", params).then(res => {
        if (res.data) {
          this.$message({
            showClose: true,
            message: "修改成功",
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
  }
};
</script>