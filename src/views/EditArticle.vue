<template>
  <!-- <el-form class="form" ref="form" :model="form" label-width="80px"> -->
  <form id="edit-article" enctype="multipart/form-data">
    <div class="item">
      <span class="text">标题</span>
      <el-input class="title-input" v-model="form.title"></el-input>
    </div>
    <div class="item">
      <span class="text">副标题</span>
      <textarea
        rows="5"
        cols="20"
        class="subtitle-input"
        v-model="form.subtitle"
      ></textarea>
    </div>
    <div class="item">
      <span class="text">封面图片</span>
      <input @change="selectFile" id="edit-file-upload" type="file" />

      <div v-if="imgURL" class="img-box">
        <el-image style="width: 100%" :src="imgURL" fit="contain"></el-image>
      </div>
    </div>

    <div class="item">
      <span class="text">时间</span>
      <el-date-picker
        popper-class="picker"
        type="date"
        placeholder="选择日期"
        v-model="form.date1"
        style="width: 200px"
      ></el-date-picker>
    </div>
    <div ref="editor" id="editor"></div>
    <el-form-item class="btn-box">
      <el-button type="primary" @click="onSubmit">{{btnText}}</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
    <!-- </el-form> -->
  </form>
</template>

<script>
import upload from "/src/utils/utils.js";
import Editor from "./Editor.vue";
import WangEditor from "wangEditor";
import { get, post } from "/src/plugins/axios.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      btnText:'立即创建',
      imgURL: "",
      blob: null,
      imgsrc: "",
      form: {
        title: "",
        subtitle: "",
        date1: "",
      },
    };
  },
  components: {
    // Upload
    Editor,
  },

  mounted() {
    this.initWangEditor();

    this.initData();
  },
  methods: {
    initData() {
      if (JSON.stringify(this.article) == "{}") return;
      let { title, subtitle, time, content,coverURL } = this.article;
      console.log(title);
      this.form.title = title;
      this.form.subtitle = subtitle;
      this.form.date1 = time;
      this.btnText = '修改'

      // let img = new Image()
      // img.onload =(e)=>{

      // }
      // img.src = 'https://data.lzhs.top/fg'

      this.editor.txt.html(content);
    },
    initWangEditor() {
      let div = this.$refs.editor;
      const editor = new WangEditor(div);
      editor.create();
      this.editor = editor;
    },

  
    async selectFile(e) {
      let file = document.getElementById("edit-file-upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;

      //  let imgURL = await upload.fileToBase64(file);
      let img = await upload.waitImgOnload(imgURL);
      let blob = await upload.imgToBlob(img);
      this.blob = blob;
      console.log(blob);
    },
    async onSubmit() {
      if (!this.form.title || !this.form.date1) {
        ElMessage.error("请填写标题或时间");
        return;
      }

      if (!this.blob) {
        ElMessage.error("请上传封面图");
        return;
      }

      let html = this.editor.txt.html();

      if (!html) {
        ElMessage.error("请填写内容");
        return;
      }

      let d1 = new Date(this.form.date1).getTime();
      let form = document.getElementById("edit-article");
      let formData = new FormData(form);
      formData.append("fileName", this.blob);
      formData.append("title", this.form.title);
      formData.append("time", d1 ? d1 : "");
      formData.append("htmlStr", html);
      formData.append("subtitle", this.form.subtitle);
      let {id} = this.article
      if(id){
        formData.append("id", id);
      }

      let res = await post("/fg/uplod/article", formData);
      // let {code,data} = res

      ElMessage.success("上传成功");
      setTimeout(() => {

        console.log('sdfsdfdsdsf');
        this.$emit("cancel");
      }, 1000);
    },

    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.picker {
  z-index: 20000 !important;
}
</style>

<style lang="scss" scoped>
#edit-article {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .text {
      margin-right: 20px;
      display: inline-block;
      flex: 0 0 80px;
    }
  }
  .title-input {
    width: 400px;
  }

  .subtitle-input {
    resize: none;
    width: 600px;
    padding: 10px;
    font-size: 14px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .img-box {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
    }
  }

  #editor {
    z-index: 0;
  }
  .btn-box {
    margin-top: 30px;
  }
}
</style>