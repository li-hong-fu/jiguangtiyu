<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import moduleMenu from "./models/system/menu";
export default {
  data() {
    return {
      Token: null,
    };
  },
  created() {
    this.getAuthMenuList();
  },
  methods: {
    getAuthMenuList() {
      moduleMenu.list().then((res) => {
        if (res.code == 200) {
          this.$storage.set("menuList", JSON.stringify(res.data));
          this.$routerAuth.addRouterAuth(this.$router, res.data);
        }
      });
    },
  },
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-container {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
