<template>
  <div>
    <el-input
      v-model="input"
      placeholder="大眠"
     
      @blur="nohotlistbox"
      @focus="hotlistbox"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <!-- 热门搜索 -->
    <div class="hot" v-show="hotshow">
      <div>热门搜索</div>
      <ul class="ali-c">
        <li
          v-for="(item,index) in hotlist"
          :key="index"
          class="cursor"
          @click="searchlist(item.first)"
        >{{item.first}}</li>
      </ul>
    </div>
    <!-- 搜索列表 -->
    <div>
      <div v-if=" hotinput.songs">
        <div>单曲</div>
        <ul>
          <li
            @click="songplay(item)"
            v-for="(item,index) in hotinput.songs"
            :key="index"
            class="cursor"
          >
            {{item.name}}-
            <span v-for="(item2,index2) in item.artists" :key="index2">{{item2.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <audio :src="music" controls="controls" autoplay></audio>
<div class="hot">
  <ul class="ali-c ">
    <li v-for="(item,index) in Songlist" :key="index" style="background:#fff;" class="cursor " @click="music=item.song">{{item.name}}</li>
</ul>
</div>
    <Banner></Banner>

<qrcode :url="qrcodeUrl"
        :iconurl="iconurl"
        :wid="298"
        :hei="278"
        :imgwid="100"
        :imghei="100">
</qrcode>

<!-- <ul>
  <li v-for="(item4,index4) in  10" :key="index4" @click="add(index4)" :style="index==index4?'color:red':''">{{index4}}</li>
</ul> -->
    <!-- 前端二维码 -->
    <!-- npm install vue_qrcodes -- save
    <qrcode :url="qrcodeUrl"
        :iconurl="iconurl"
        :wid="298"
        :hei="278"
        :imgwid="100"
        :imghei="100">
    </qrcode>-->
    <UploadList :length="3"></UploadList>
  </div>
</template>
<script>
import qrcode from "vue_qrcodes";
import Banner from "../../components/banner";
import UploadList from '../../components/UploadList.vue'
import {zz,throttle} from "./song.js"
export default {
  components: {
    Banner,
    qrcode,
    UploadList
  },
  data() {
    return {
      // index:null,
      input: "",
      music: "",
      hotlist: [],
      hotshow: false,
      hotinput: {
        songs: null
      },
      qrcodeUrl:"https://www.baidu.com",
     iconurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583678192890&di=08baea4fbce5e80c5d2c834f386a0cff&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907215510_Z8dws.thumb.700_0.jpeg"
    };
  },
  computed: {
     Songlist(){
        return zz
     }
  },
  methods: {
    // add(index){
    //   this.index=index
    // },
    searchlist(search) {
      //  this.$toast.show()
      this.$loading.show();
      this.input = search;
      this.changehot();
    },
    hotlistbox() {
      this.hotshow = true;
    },
    nohotlistbox() {
      // this.hotshow = false;
    },
    changehot() {
      if (this.input != "") {
        this.hotshow = false;
        this.$server
          .search({ keywords: this.input })
          .then(res => {
            console.log(res);
            this.hotinput = res.result;
          })
          .catch(e => {});
      } else {
        this.hotinput = {
          songs: null
        };
        this.hotshow = true;
      }
      // console.log(1000)
    },
    songplay(item) {
      this.$server
        .songs({ id: item.id })
        .then(res => {
          this.music = res.data[0].url;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getsonglist() {
      this.$server
        .hot()
        .then(res => {
          this.hotlist = res.result.hots;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  created() {
    this.getsonglist();
  },
  watch:{
    'input':{
      handler(newName,oldName){
          throttle(this.changehot,2000)()
          
      }
    }
  }
};
</script>
<style scoped>
.hot {
  padding: 5px;
}
.hot > div {
  font-size: 14px;
  color: #5c5c5c;
  margin-bottom: 10px;
}
.hot > ul > li {
  color: #4a4a4a;
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 0 10px 10px 0;
}
.hot > li:hover {
  background: #f5f5f5;
}


</style>