<template>
  <div class="header-container">
    <div class="collapse">
      <i
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="switchs()"
        style="font-size: 24px"
      ></i>
    </div>
    <div class="user">
      <div class="link">
        <a :href="getDemoUrl" target="_blank" class="cur">预览网站</a>
        <a :href="getCmsUrl" target="_blank">官方网站</a>
      </div>
      <el-dropdown>
        <div class="el-dropdown-link">
          <div class="info el-cursor-pointer">
            <img class="el-mg-r-5" src="../assets/images/user.png" />
            {{ account }}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="padding: 0">
            <span
              @click="onOpenPwd()"
              style="
                display: inline-block;
                padding: 6px 20px;
                width: 100px;
                text-align: center;
              "
              >修改密码</span
            >
          </el-dropdown-item>
          <el-dropdown-item style="padding: 0">
            <span
              @click="onOut"
              style="
                display: inline-block;
                padding: 6px 20px;
                width: 100px;
                text-align: center;
              "
              >退出登录</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      account: "userName",
    };
  },
  methods: {
    /**
     * 侧栏切换
     */
    switchs() {
      this.$store.commit("updateCollapseStatus");
    },
    onOpenPwd() {
      console.log("修改密码");
    },
    onOut() {
      console.log("退出登录");
    },
  },
  computed: {
    getDemoUrl() {
      return "http://www.jiguangtiyu.com";
    },
    getCmsUrl() {
      return "http://d.jiguangtiyu.com";
    },
    ...mapState({
      isCollapse: (state) => state.collapse,
    }),
  },
};
</script>


<style lang="less">
.header-container {
  padding: 0 20px;
  height: 54px;
  line-height: 54px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #ffffff;
  display: flex;
  justify-content: space-between;

  .user {
    font-size: 26px;
    float: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .link {
      font-size: 14px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        display: block;
        font-size: 14px;
        text-align: center;
        color: #333;
        width: 76px;
        height: 30px;
        line-height: 30px;
        margin-right: 40px;
        text-decoration: none;
        &.cur {
          color: #409eff;
          background: #e1f8ff;
        }
      }
    }

    .el-dropdown-link {
      .info {
        display: flex;
        align-items: center;
        line-height: 24px;

        img {
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
        }
      }
    }

    .dropdown-menu {
      span {
        display: inline-block;
        padding: 10px 20px;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>