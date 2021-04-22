import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '../components/BasicLayout.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: BasicLayout,
      redirect: { name: "BasicLayout" },
      children: []
    },
    // 登陆
    {
      path: '/login',
      component: () => import('@/views/AccountLogin.vue')
    },
    // 404
    {
      path: '/404',
      name: 'Error404',
      component: () => import('@/views/Error404.vue')
    },
  ]
})

export default router
