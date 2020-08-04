<template>
  <div>
    <div class="upload_box ali-c jus-c" v-show="image==''">
      <i class="el-icon-plus" size="19px"></i>
      <input type="file" @change="uploadfile($event)" ref="inputer" />
    </div>
    <div v-show="image" class="upload_image">
      <img :src="image" />
    </div>
  </div>
</template>
<script>
import axios from 'axios' 
export default {
  props:["id"],
  data() {
    return {
      image: ""
    };
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
      axios.post("https://lycard.jushiwl.com/h5/my_api/upload", param, config)
        .then(res => {
           console.log(res);
          if (res.data.code === 200) {
           
            this.image=res.data.data.url
             this.$emit('Imageurl',res.data.data.url,this.id)
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