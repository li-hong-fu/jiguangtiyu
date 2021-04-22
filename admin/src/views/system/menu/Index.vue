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
import modeleMenu from "../../../models/system/menu";
import Dialog from "@/views/system/menu/dialog.vue";

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      modeleMenu.list().then((res) => {
        if (res.data.code == 200) {
          let list = res.data.data;

          this.tableData = this.$utils.getTreeToArray(list);
        }
      });
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
          this.onDel(row.id);
          break;
      }
    },

    async onDel(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="less">
</style>