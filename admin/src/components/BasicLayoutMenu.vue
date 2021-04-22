<template>
  <div class="aside-container">
    <el-menu
      :default-active="path"
      background-color="#222d32"
      text-color="#b8c7ce"
      :router="true"
      :collapse="isCollapse"
    >
      <div class="logo">
        <p v-show="!isCollapse">极光体育后台管理</p>
        <p v-show="isCollapse">极光体育</p>
        <!-- <img v-show="isCollapse" src="@/assets/images/minlogo.png"> -->
      </div>
      <template v-for="route in filterRoutes">
        <el-submenu
          v-if="hasNavChildren(route)"
          :index="route.path"
          :key="route.path"
        >
          <template slot="title">
            <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
            <span slot="title">{{ route.meta.nav.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="route in route.children"
              :key="route.path"
              :index="route.path"
              :route="{ path: route.path }"
              :id="route.name"
            >
              <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
              <span slot="title">{{ route.meta.nav.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item
          v-else
          :key="route.path"
          :disabled="route.disabled"
          :index="route.path"
          :route="{ path: route.path }"
          :id="route.name"
        >
          <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
          <span slot="title">{{ route.meta.nav.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      path: this.$route.path,
      filterRoutes: [],
    };
  },
  created() {
    this.getRoutes();
    // 根据分辨率来决定左侧是否切换
    window.addEventListener("resize", () => {
      this.initResize();
    });
  },
  watch: {
    $route(to) {
      this.path = to.path;
    },
  },
  methods: {
    initResize() {
      if (document.body.clientWidth < 1200) {
        this.$store.commit("updateCollapseStatus", true);
      } else {
        this.$store.commit("updateCollapseStatus", false);
      }
    },
    getRoutes() {
      const routes = JSON.parse(this.$storage.get("menuList"));
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach((data) => {
        if (data.type == 1) {
          result.push({
            children: [],
            id: data.id,
            code: data.code,
            path: data.router,
            meta: {
              nav: {
                icon: data.icon,
                title: data.name,
              },
            },
          });
        }

        result.forEach((arr, index) => {
          if (arr.id == data.pid) {
            result[index].children.push({
              path: data.router,
              code: data.code,
              meta: {
                nav: {
                  icon: data.icon,
                  title: data.name,
                },
              },
            });
          }
        });
      });

      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some((data) => data.meta && data.meta.nav);
    },
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.collapse,
    }),
  },
};
</script>

<style lang="less">
.aside-container {
  height: 100%;
}
.el-menu:not(.el-menu--collapse) {
  height: 100%;
  width: 220px;
  flex: 0 0 220px;
  .logo {
    color: #fff;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    padding: 14px 0;
    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.el-menu--collapse {
  height: 100%;
  .logo {
    font-size: 14px;
    color: #fff;
    padding: 22px 0;
    text-align: center;
    font-weight: bold;
    font-family: system-ui;
    p {
      margin: 0;
    }
  }
}
</style>