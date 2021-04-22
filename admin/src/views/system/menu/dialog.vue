<template>
  <div class="dialog">
    <el-dialog
      title="新增"
      custom-class="el-dialog-common"
      :visible.sync="visible"
    >
      <el-form
        :ref="formRef"
        :rules="rules"
        :model="form"
        label-width="80px"
        size="small"
      >
        <el-form-item label="菜单分类" prop="pid">
          <el-select
            v-model="form.pid"
            filterable
            clearable
            placeholder="请选择分类"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="权限URL" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label="路由URL" prop="router">
          <el-input v-model="form.router"></el-input>
        </el-form-item>

        <el-form-item label="code" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="是否显示" prop="display">
          <el-radio-group v-model="form.display">
            <el-radio label="1"></el-radio>
            <el-radio label="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>

        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="visible = false">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            @click="onSubmit"
          >
            确 定
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: {
  //   // 菜单列表
  //   tableList: {
  //     type: Array,
  //   },
  //   // 单条数据ID
  //   id: {
  //     type: [Number, String],
  //   },
  // },
  data() {
    return {
      // 状态
      loading: false, // 按钮等待
      visible: false, // 弹窗开关
      tableList: {},

      // 表单
      formRef: "formRef", // ref

      form: {
        pid: "",
        name: "",
        type: "",
        icon: "",
        url: "",
        router: "",
        code: "",
        display: "1",
        sort: 0,
      },

      // 验证
      rules: {
        pid: [{ required: true, message: "请选择分类", trigger: "change" }],
        name: [
          { required: true, message: "请输入菜单名称", trigger: "change" },
          {
            min: 2,
            max: 16,
            message: "字符长度2到16个字符",
            trigger: "change",
          }, // validator: newReg1,
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        icon: [{ max: 50, message: "最大长度50个字符", trigger: "change" }],
        url: [{ max: 50, message: "最大长度50个字符", trigger: "change" }],
        code: [{ max: 50, message: "最大长度50个字符", trigger: "change" }],
        router: [{ max: 50, message: "最大长度50个字符", trigger: "change" }],
        sort: [
          { type: "number", message: "必须为数字", trigger: "change" },
          {
            type: "number",
            max: 9999,
            message: "排序最高不得超过9999",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    const routes = JSON.parse(this.$storage.get("menuList"));
    console.log(routes)
  },
  methods: {
    onSubmit() {
      console.log(123);
    },
  },
};
</script>