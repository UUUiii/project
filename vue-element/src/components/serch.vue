<template>
  <div class="upload_list">
    <img class="layui-upload-img" name="titleBase64Img" id="base64Img" :src="headImg" />
    <div class="fileInput">
      <input
        type="file"
        id="Updateimage"
        lay-verify="required"
        @change="toBase64()"
        accept="image/jpeg, image/png, image/jpg"
      />
    </div>
  </div>
</template>
 
<script>
var qs = require("qs");
export default {
  data() {
    return {
      headImg: "",
      imageUrl: "",
      type: ""
    };
  },
  methods: {
    // toBase64() {
    //   var that = this;
    //   var file = document.querySelector("input[type=file]").files[0];
    //   console.log("base64", file);
    //   var reader = new FileReader();
    //   reader.onloadend = function() {
    //     $("#base64Img").attr("style", "display:inline-block");
    //     $("#base64Img").attr("src", reader.result);
    //     //把转换后的数据给id为base64Img的src属性
    //     console.log(reader.result);
    //     that.imageUrl = reader.result;
    //     that.updataImg();
    //     //这里调用了向后台发请求的代码
    //   };
    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    // },
    updataImg() {
      var that = this;
      var json = {};
      json.imageBase64Str = that.imageUrl;
      this.$http
        .post("/api/setimg", qs.stringify(json, { indices: false }))
        .then(res => {
          console.log("返回的数据", res.data.data);
          if (res.data.code == 200) {
            that.headImg = res.data.data.imgUrl;
            console.log("返回的图片", that.headImg);
            this.$message({
              message: "图片上传成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "图片上传失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.img_delete {
  margin-top: 20px;
  position: relative;
}
</style>>