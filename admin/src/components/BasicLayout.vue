<template>
  <el-container>
    <Aside></Aside>
    <div class="el-layout-right">
      <el-header><Header></Header></el-header>
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import Aside from "./BasicLayoutMenu";
import Header from "./BasicLayoutHeader";
import { mapState } from "vuex";

export default {
  components: {
    Aside,
    Header,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapState({
      isCollapse: (state) => state.collapse,
    }),
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/common.css");

.el-header {
  padding: 0;
  min-width: 1200px;
}
</style>