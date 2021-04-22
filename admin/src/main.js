import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as filters from './utils/filters'; // 全局过滤
import msg from './utils/msg'; // 全局消息
import Storage from './utils/storage'; // 本地存储
import routerAuth from './router/routes';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$routerAuth = routerAuth
Vue.prototype.$msg = msg;
Vue.prototype.$storage = Storage;

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
