<template>
  <div class="main-container">
    <!-- 操作 -->
    <div class="btn-section">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="onOpenWin('add')">新增</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" row-key="id" border stripe lazy size="small"
      :tree-props="{ children: 'childrens', hasChildren: 'hasChildren' }">
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
      <el-table-column prop="router" label="路由URL" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.type | systemMenuTypeToStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="display" width="50px">
        <template slot-scope="scope">
          <span v-if="scope.row.display == 0" class="hide">隐藏</span>
          <span v-else>显示</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="CODE"></el-table-column>
      <el-table-column prop="url" label="API"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="onOpenWin('addSub', scope.row)" size="mini">新增子类</el-button>
          <el-button @click="onOpenWin('edit', scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="onOpenWin('del', scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Dialog ref="addRefs" :tableList="tableList" :id="tableRowId" :pid="tableRowPid" :state="tableState"></Dialog>
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
        tableList: [],
        tableRowId: null,
        tableRowPid: null,
        tableState: null,
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        modeleMenu.list().then((res) => {
          if (res.code == 200) {
            let data = res.data;
            const oneMenuList = this.$utils.getCategory(data); // 索引0所有一级分类，索引1所有子类
            this.tableData = this.$utils.getChildrenTree( oneMenuList, oneMenuList[0] ); // 按父子关系处理分类
            this.tableList = this.$utils.getTreeToArray( this, this.tableData, null, null, false); // 按可伸展处理分类
            this.$utils.getSorting(this.tableData)
          }
        });
      },

      onOpenWin(type, row = {}) {
        this.tableRowId = row.id;
        this.tableState = type;
        this.$refs.addRefs.visible = true;
        if (type == "edit") {
          this.tableRowPid = row.pid
        } else if (type == "del") {
          this.onDel(row.id);
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