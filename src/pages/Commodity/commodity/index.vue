<template>
  <div>
    <div class="ali-c">
      <span style="margin-right:10px">类型:</span>
      <el-select v-model="inputvalue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
        </el-option>
      </el-select>
    </div>

    <div class="ali-c jus-b">
      <div style="width:45% ">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100% ;height:400px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="120"></el-table-column>
          <el-table-column label="商品id" width="150">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
          <el-table-column prop="shopname" label="商家名称" show-overflow-tooltip width="150"></el-table-column>
        </el-table>
      </div>

      <div style="flex:1" class="ali-c jus-c flexv">
        <el-button size="mini" round type="primary" @click="add">添加</el-button>

        <el-button
          size="mini"
          round
          type="primary"
          @click="del"
          style="margin-top:10px!important;margin-left:0;"
        >删除</el-button>
      </div>

      <div style="width:45%">
        <el-table
          ref="multipleTable"
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100% ;height:400px"
          @selection-change="handleSelectionChange2"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="商品id" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
          <el-table-column prop="shopname" label="商家名称" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="addd" label=" 排序权重" width="120">
            <template slot-scope="scope">
              <el-input size="mini" placeholder="请输入内容" v-model="scope.row.addd"></el-input>
              <!-- <el-input v-if="scope.row.addd==''" v-model="scope.row.addd" size="mini" placeholder="请输入内容"></el-input>
              <span v-else>{{scope.row.addd}}</span>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      inputvalue: "",
      tableData: [
        {
          id: 1,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 2,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 3,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 4,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 5,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 6,
          name: "ihpone11 pro",
          shopname: "小米公司"
        },
        {
          id: 7,
          name: "ihpone11 pro",
          shopname: "小米公司"
        }
      ],
      multipleSelection: [],
      tableData2: [],
      multipleSelection2: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    //添加按钮
    add() {
      if (this.multipleSelection.length == 0) {
        return false;                         //左边数组为空就不执行下面
      }
      for (var i = this.tableData.length; i >= 0; i--) {
        if (this.multipleSelection.includes(this.tableData[i])) {
          this.tableData.splice(i, 1);                          //删除左边选中数组
        }
      }
      let arr = Array.from(JSON.parse(JSON.stringify(this.multipleSelection)));  //深拷贝数组
      let arr2 = [];
      arr.forEach(res => {
        if (!this.tableData2.includes(res)) {
          arr2.push(res);                               //筛选数组已有项
        }
      });
      this.tableData2 = [...this.tableData2, ...arr2];  //合并筛选数组
      this.tableData2 = this.sort1(this.tableData2); //右边数组排序
      this.multipleSelection = [];          //左边选中项为空
    },

    //删除按钮
    del() {
      if (this.multipleSelection2.length == 0) {
        return false;                       //右边数组为空就不执行下面
      }
      for (var i = this.tableData2.length; i >= 0; i--) {
        if (this.multipleSelection2.includes(this.tableData2[i])) {
          this.tableData.push(this.tableData2[i]);              //将右边数组选中项push到左边数组取       
          this.tableData = this.sort1(this.tableData);            //左边数组排序
          this.tableData2.splice(i, 1);                //删除右边数组选中项
        }
      }
      this.multipleSelection2 = []; //右边选中项为空
    },
    //排序方法
    sort1(arr) {
      arr.sort(this.sort2("id"));
      let arr2 = [{ a: 1 }, { a: 4 }, { a: 3 }];
      return arr;
    },
      //排序方法
    sort2(key) {
      return function(value1, value2) {
        var val1 = Number(value1[key]);
        var val2 = Number(value2[key]);

        return val1 - val2;
      };
    }
  }
};
</script>