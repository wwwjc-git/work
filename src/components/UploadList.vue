<template>
  <div>
    <div v-show="image.length>0" class="upload_image" v-for="(item,index) in image" :key="index">
      <img :src="image" />
    </div>
    <div class="upload_box ali-c jus-c" v-show="image.length<MaxNum">
      <i class="el-icon-plus" size="19px"></i>
      <input type="file" @change="uploadfile($event)" ref="inputer" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id", "length"],
  data() {
    return {
      image: []
    };
  },
  computed: {
    MaxNum() {
      return this.length ? this.length : 1;
    }
  },
  methods: {
    uploadfile(e) {
      var self = this;
      let file = e.target.files[0];
      let param = new FormData(); // 创建form对象
      param.append("myfile", file); // 通过append向form对象添加数据
      param.append("filename", "myfile"); // 通过append向form对象添加数
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      console.log(param);
      axios
        .post("https://lycard.jushiwl.com/h5/my_api/upload", param, config)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.image.push(res.data.data.url);
            console.log(this.MaxNum);
            //  this.$emit('Imageurl',res.data.data.url,this.id)
          }
        })
        .catch(() => {
          return Promise.reject("失败");
        });
    }
  }
};
</script>
<style scoped>
.upload_box {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.upload_box > input {
  opacity: 0;
  position: absolute;
}
.upload_image {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.upload_image img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
</style>