<template>
  <div >
    <!-- <button @click="odd">123</button> -->
    <el-table :data="list2" style="width: 100%">
      <el-table-column
        :property="item.id"
        :label="item.name"
        :width="index==0?'80':'180'"
        v-for="(item,index) in arr"
        :key="index"
      >
        <template slot-scope="scope">
          <div v-if="scope.column.property=='tablePic'">
              <Upload @Imageurl="Image"   :id="scope.row.id"></Upload>
          </div>
          <div
            v-else-if="!NOinput.includes(scope.column.property)"
          >{{scope.row[scope.column.property]}}</div>
          <!-- 上传图片 -->

          <!-- 上传图片结束 -->
          <el-input v-else v-model="scope.row[scope.column.property]" :placeholder="item.name"></el-input>
          <!-- <div>{{scope.column}}</div> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="ali-c jus-c">
      <el-button type="success" @click="look">提交</el-button>
    </div>
  </div>
</template>
<script>
import { odd } from "./odd.js";
import Upload from "./upload"
export default {
  components:{
    Upload
  },
  props: ["list"],
  data() {
    return {
      defaultTableColumnList: [
        { id: "tableId", name: "编号" },
        { id: "tableLocalName", name: "本地名" },
        { id: "tableCostPrice", name: "成本价" },
        { id: "tableSalePrice", name: "销售价" },
        { id: "tablePic", name: "图片" }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // list2:[],
      // arr:[],
    };
  },
  methods: {
    look() {
      console.log(this.list2);
    },
    NOin(arr) {
      this.NOinput.push(this.list);
    },
    Image(v,index){
        console.log(v,index)
        this.list2[index].tablePic=v
        console.log(this.list2)
    }
  },
  computed: {
    NOinput: function() {
      return ["tableLocalName", "tableCostPrice", "tableSalePrice"];
    },
    list2: function() {
      return this.list&&this.list.length?odd(this.list):[];
    },
    arr: function() {
      return [...this.defaultTableColumnList, ...this.list];
    }
  },
  watch: {

  },
};
</script>
<style>

</style>
