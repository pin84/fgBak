<template>
  <div id="upload">
    <!-- <div></div>
    <div @click="upload" class="iconfont icon-jia"></div> -->

    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="pre-view">
      <img width="100%" :src="dialogImageUrl" alt="" />

    </div>
    <!-- <el-dialog v-if="true"> -->
      <!-- <img width="100%" :src="dialogImageUrl" alt="" /> -->
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import utils from "/src/utils/utils.js";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url);
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 60px;
#upload {
  display: flex;
  .iconfont {
    font-size: 40px;
    border: 1px solid #f1f1f1;
    width: $w;
    height: $w;
    text-align: center;
    line-height: $w;
    color: gray;
  }
  .pre-view{
    width: 200px;
    height: 200px;
    border: 1px solid red;
  }
}
</style>