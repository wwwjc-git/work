<template>
  <div>
    <div class="ali-c">
      <div class="sukname">规则名称:</div>

      <ul class="ali-c flex-wrap" style="flex:1">
        <li v-for="(item,index) in suk" :key="index" class="suk">
          <el-input size="small" v-model="item.name" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-close" @click="del(index)" v-if="index!=0"></el-button>
          </el-input>
        </li>
        <li class="addsuk" @click="add">
          <i class="el-icon-plus"></i>
          <span>添加新规则</span>
        </li>
      </ul>
    </div>

    <ul>
      <li v-for="(item2,index2) in suk" :key="index2" class="ali-c">
        <div class="sukname" :style="item2.name?'':'color:red'">{{item2.name?item2.name:'请在规则名称中输入规则'}}:</div>
        <ul class="ali-c flex-wrap" style="flex:1">
          <li v-for="(item3,index3) in item2.suklist" :key="index3" class="suk">
            <el-input size="small" v-model="item2.suklist[index3]" placeholder="请输入内容" :disabled="item2.name?false:true">
              <el-button
                slot="append"
                icon="el-icon-close"
                @click="delson(index2,index3)"
                v-if="index3!=0"
              ></el-button>
            </el-input>
          </li>
          <li class="addsuk" @click="addson(index2)" v-show="item2.name">
            <i class="el-icon-plus"></i>
            <span>添加新规则数据</span>
          </li>
          <li class="addsuk addsuk2" @click="del(index2)">
            <i class="el-icon-minus"></i>
            <span>删除此规则</span>
          </li>
        </ul>
      </li>
    </ul>

  <!-- <div class="ali-c jus-c">
    <el-button type="success">生成</el-button>
  </div> -->
    <SKUtable :list="suk" v-if="suk&&suk.length"></SKUtable>
  </div>
</template>

<script>
import SKUtable from "./skutable";
export default {
  components: {
    SKUtable
  },
  data() {
    return {
      addSuk: "", //输入规格动态绑定
      addSuk2: "", //输入规格值动态绑定
      suk: [
        {
          id: 'A1',
          name: "型号",
          suklist: ["大陆版", "港版", "台版"]
        },
        {
          id: 'A2',
          name: "内存",
          suklist: ["4G", "2G", "6G"]
        }
      ]
    };
  },
  created() {

  },
  methods: {
    add() {
      this.suk.push({
        id:'A'+this.suk.length + 1,
        name: "",
        suklist: [""]
      });
    },
    addson(i) {
      this.suk[i].suklist.push("");
    },
    del(i) {
      this.suk.splice(i, 1);
    },
    delson(i, i2) {
      this.suk[i].suklist.splice(i2, 1);
    }
  }
};
</script>
<style scoped>
.suk {
  margin: 10px;
}
.addsuk {
  margin: 10px;
  padding: 5px;
  border: 1px dashed #ccc;
  cursor: pointer;
  border-radius: 3px;
}

.addsuk:hover {
  border: 1px dashed #2d8cf0;
  color: #2d8cf0;
}

.addsuk2:hover{
  border: 1px dashed red!important;
  color: red!important;
}
.sukname {
  width: 200px;
  margin-right: 100px;
  text-align: center;
}
</style>