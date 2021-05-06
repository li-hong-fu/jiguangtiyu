<template>
  <div class="dialog">
    <el-dialog
      :title="state == 'edit' ? '编辑' : '新增'"
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
            <el-option
              class="option-level0"
              label="顶级分类"
              :value="0"
            ></el-option>
            <template v-for="item in tableList">
              <el-option
                :class="'option-level' + item.level"
                :label="item.level != 1 ? '└─ ' + item.title : item.title"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-col :span="23">
            <el-input
              clearable
              v-model="form.name"
              auto-complete="off"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="图标"
          prop="icon"
          v-show="form.type == '' || form.type == 1"
        >
          <el-col :span="23">
            <el-input
              clearable
              v-model="form.icon"
              auto-complete="off"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item
          label="权限URL"
          prop="url"
          v-show="form.type == '' || form.type == 3 || form.type == 4"
        >
          <el-col :span="23">
            <el-input
              clearable
              v-model="form.url"
              auto-complete="off"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item
          label="路由URL"
          prop="router"
          v-show="form.type == '' || form.type == 2 || form.type == 1"
        >
          <el-col :span="23">
            <el-input
              clearable
              v-model="form.router"
              auto-complete="off"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="code" prop="code" v-show="form.type != 1">
          <el-col :span="23">
            <el-input
              clearable
              v-model="form.code"
              auto-complete="off"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="是否显示" prop="display">
          <el-col :span="23">
            <el-radio
              clearable
              v-model="form.display"
              v-for="item in displayRadio"
              :key="item.id"
              :label="item.id"
            >
              {{ item.name }}</el-radio
            >
          </el-col>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-col :span="23">
            <el-input
              clearable
              v-model.number="form.sort"
              auto-complete="off"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>

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
    </el-dialog>
  </div>
</template>

<script>
import modeleMenu from "../../../models/system/menu";

export default {
  props: {
    // 菜单列表
    tableList: {
      type: Array,
    },
    // 单条数据ID
    id: {
      type: [Number, String],
    },
    // 单条数据ID
    pid: {
      type: [Number, String],
    },
    state: {
      type: String,
    },
  },
  data() {
    return {
      // 状态
      loading: false, // 按钮等待
      visible: false, // 弹窗开关

      // 表单
      formRef: "formRef", // ref

      // 类型
      typeOption: [
        {
          id: 1,
          name: "分类",
        },
        {
          id: 2,
          name: "菜单",
        },
        {
          id: 3,
          name: "按钮",
        },
        {
          id: 4,
          name: "动作",
        },
      ],

      // 是否显示
      displayRadio: [
        {
          id: 1,
          name: "显示",
        },
        {
          id: 0,
          name: "不显示",
        },
      ],

      form: {
        pid: "",
        name: "",
        type: "",
        icon: "",
        url: "",
        router: "",
        code: "",
        display: 1,
        sort: 0,
      },

      // 验证
      rules: {
        pid: [
          {
            required: true,
            message: "请选择分类",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "change",
          },
          {
            min: 2,
            max: 16,
            message: "字符长度2到16个字符",
            trigger: "change",
          }, // validator: newReg1,
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
        icon: [
          {
            max: 50,
            message: "最大长度50个字符",
            trigger: "change",
          },
        ],
        url: [
          {
            max: 50,
            message: "最大长度50个字符",
            trigger: "change",
          },
        ],
        code: [
          {
            max: 50,
            message: "最大长度50个字符",
            trigger: "change",
          },
        ],
        router: [
          {
            max: 50,
            message: "最大长度50个字符",
            trigger: "change",
          },
        ],
        sort: [
          {
            type: "number",
            message: "必须为数字",
            trigger: "change",
          },
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
  methods: {
    //初始化页面
    init() {
      if (this.state == "edit") {
        this.getDetail();
      } else {
        this.form.pid = this.id;
      }
    },

    //获取详情
    getDetail() {
      modeleMenu.item(this.id).then((res) => {
        if (res.code == 200) {
          this.form = {
            id: res.data.id,
            pid: res.data.pid,
            name: res.data.title,
            type: res.data.type,
            icon: res.data.icon,
            url: res.data.url,
            router: res.data.router,
            code: res.data.code,
            display: res.data.display,
            sort: res.data.sort,
          };
        }
      });
    },

    //确认按钮
    onSubmit() {
      // 表单验证
      this.$refs[this.formRef].validate((valid) => {
        if (valid) {
          // 禁止按钮
          this.loading = true;
        }
      });

      let params = {
        pid: this.form.pid,
        name: this.form.name,
        type: this.form.type,
        code: this.form.code,
        icon: this.form.icon,
        url: this.form.url,
        router: this.form.router,
        display: this.form.display,
        sort: this.form.sort,
      };

      if (this.id) {
        params.id = this.id;
      }

      if (this.loading) {
        if (this.state == "edit") {
          this.onEdit(params);
        } else {
          this.onAdd(params);
        }
      }
    },

    //添加
    onAdd(params) {
      modeleMenu.insert(params).then((res) => {
        if (res.code == 200) {
          this.$msg.success(res.data);
          this.loading = false;
          this.$parent.getList();
          this.visible = false;
        }
      });
    },
    //编辑子类
    onEdit(params) {
      console.log(params);
    },
  },
  watch: {
    // 监听弹窗开关状态来控制组件的初始化
    visible(status) {
      if (status) {
        this.init();
      } else {
        this.$refs[this.formRef].resetFields();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.option-level1 {
  margin-left: 40px;
}

.option-level2 {
  margin-left: 60px;
}
</style>