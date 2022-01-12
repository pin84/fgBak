<template>
  <div id="article">
    <div v-if="isShowArticle">
      <div class="search-box">
        <!-- <el-input
          class="input"
          v-model="inputText"
          placeholder="请输入内容"
        ></el-input> -->
        <!-- <el-button class="btn" type="primary" icon="el-icon-search"
          >搜索</el-button
        > -->

        <label for="upload" class="label">上传</label>
        <input @change="uploadImg"  type="file" id="upload" style="display: none" />
        <!-- <el-button
          class="btn"
          @click="uploadArticle"
          type="primary"
          icon="el-icon-paperclip"
          >上传</el-button
        > -->
      </div>

      <div class="list">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <div class="time com ellipsis">{{ item.time }}</div>
          <div class="title com ellipsis">{{ item.title }}</div>
          <div class="con com ellipsis">{{ item.subtitle }}</div>
          <div class="btn-box">
            <!-- <el-button type="text" size="small"
              >查看</el-button
            > -->
            <el-button @click="edit(item)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deleteArticle(item)" type="text" size="small"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <EditArticle :article="curArticle" @cancel="cancel" v-else />
  </div>
</template>

<script>
import upload from "/src/utils/utils.js";
import EditArticle from "./EditArticle.vue";
import { get, post } from "/src/plugins/axios.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      blob:null,
      curArticle: {},
      isShowArticle: true,
      inputText: "",
      listData: [],
    };
  },

  components: {
    EditArticle,
  },

  created() {
    // this.initData();
  },

  methods: {
  async  uploadImg(){
           let file = document.getElementById("upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;

      //  let imgURL = await upload.fileToBase64(file);
      let img = await upload.waitImgOnload(imgURL);
      let blob = await upload.imgToBlob(img);
      this.blob = blob;

      let formData = new FormData()

      formData.append('')

      // let res = await post('/fg/uploadbanner')
      // console.log(res);
    },
    async deleteArticle(item) {
      let res = await get(`/fg/delArticle?id=${item.id}`);
      this.initData();
      ElMessage.success(res.data);
    },
    async initData() {
      let res = await get("/fg/getArticle?page=1&num=999");
      let list = res.data;
      console.log(list);
      list.forEach((item) => {
        item.time = this.formatDate(item.time);
      });
      this.listData = list;
    },
    cancel() {
      this.isShowArticle = true;
      this.initData();
    },
    uploadArticle() {
      this.isShowArticle = false;
    },
    edit(obj) {
      this.curArticle = obj;
      this.isShowArticle = false;
    },

    formatDate(time) {
      var date = new Date(parseInt(time));
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      return year + "/" + mon + "/" + day;
    },
  },
};
</script>

<style lang="scss" scoped>
#article {
  position: relative;
  background-color: #fff;
  padding: 30px;
  .search-box {
    width: 50%;
    margin-bottom: 20px;
    .label {
      padding: 10px 25px;
      background-color: #409eff;
      color: #fff;
      font-size: 14px;
      border-radius: 3px;
      &:hover{
        opacity: 0.9;
        cursor: pointer;
      }
    }
    .input {
      width: 200px;
    }
    .btn {
      margin-left: 10px;
    }
  }
  .edit-box {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1200px;
    height: 600px;
    z-index: 10;
    border: 1px solid red;
  }
  .list {
    width: 100%;
    border: 1px solid #ccc;
    border-bottom: none;
    .item {
      display: flex;
      // align-items: center;
      border-bottom: 1px solid #ccc;
      &:hover {
        background-color: #eee;
      }
      .com {
        border-right: 1px solid #ccc;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
      .time {
        flex: 0 0 130px;
      }
      .title {
        flex: 0 0 100px;
      }
      .con {
        width: 100%;
        text-align: left;
      }

      .btn-box {
        flex: 0 0 150px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>