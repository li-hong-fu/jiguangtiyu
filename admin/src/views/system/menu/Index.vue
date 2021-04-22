<template>
  <div class="main-container">
    <!-- 操作 -->
    <div class="btn-section">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="onOpenWin('add')"
        >新增</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      stripe
      lazy
      size="small"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="router" label="单页URL" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100px"></el-table-column>
      <el-table-column prop="code" label="CODE"></el-table-column>
      <el-table-column prop="url" label="权限URL"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="onOpenWin('addSub', scope.row)" size="mini"
            >新增子类</el-button
          >
          <el-button
            @click="onOpenWin('edit', scope.row)"
            size="mini"
            type="primary"
            >编辑</el-button
          >
          <el-button
            @click="onOpenWin('del', scope.row)"
            size="mini"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Dialog ref="refs"></Dialog>
  </div>
</template>

<script>
import Dialog from "@/views/system/menu/dialog.vue";

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          children: [
            {
              id: 36,
              date: "2016-05-01",
              name: "网灭",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 44,
              date: "2016-05-01",
              name: "认识",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      console.log(tree, treeNode, resolve);
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },

    onOpenWin(type, row = {}) {
      switch (type) {
        case "add":
          this.$refs.refs.visible = true;
          break;
        case "addSub":
          this.$refs.refs.visible = true;
          break;
        case "edit":
          this.$refs.refs.visible = true;
          break;
        case "del":
          this.onDel(row.id)
          break;
      }
    },

    async onDel(id){
      console.log(id)
    },
  },
};
</script>

<style lang="less">
</style>