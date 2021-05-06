import storage from "../utils/storage";
import utils from '../utils';

export default {
    /**
     * 路由添加权限
     * @param {opject} routerThis 路由对象
     * @param {array} menuList 菜单列表
     * @return {array}
     */
    addRouterAuth(routerThis, menuList) {
        /*
         * 定义路由
         */
        const routes = [
            // 首页
            {
                path: '/',
                component: () =>
                    import('@/components/BasicLayout'),
                children: [],
                beforeEnter: (to, from, next) => {  //路由守卫（未登录定向跳转登录页）
                    const TOKEN = storage.get('token');
                    if (!TOKEN) {
                        next({ name: 'Login' })
                    }
                    next()
                }
            },
            // 登陆
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/AccountLogin.vue'),
                beforeEnter: (to, from, next) => {  //路由守卫（已登录定向跳转首页）
                    const TOKEN = storage.get('token');
                    if (TOKEN) {
                        next({ name: 'MENU' })
                    }
                    next()
                }
            },
            // 404
            {
                path: '/404',
                name: 'Error404',
                component: () => import('@/views/Error404.vue')
            },
            // 404
            {
                path: '*',
                hidden: true,
                redirect: '/404'
            }
        ]

        /*
         * 处理数据库获取的路由数据
         */
        menuList.forEach(data => {
            if (data.type == 1) {
                routes[0].children.push({
                    children: [],
                    id: data.id,
                    path: data.router,
                    name: data.name,
                    sort: data.sort,
                    meta: {
                        nav: {
                            icon: data.icon,
                            title: data.title,
                        },
                    },
                    component: { render: h => h("router-view") },
                })
            }

            routes[0].children.forEach((arr, index) => {
                if (arr.id == data.pid) {
                    const routerUrl = () =>
                        import(/* webpackChunkName: "routerUrl" */ "@/views" + `${data.router}` + "/Index.vue");
                    routes[0].children[index].children.push({
                        path: data.router,
                        name: data.name,
                        meta: {
                            nav: {
                                icon: data.icon,
                                title: data.title,
                            },
                        },
                        component: routerUrl
                    })
                }

            })
        })

        utils.getSorting(routes[0].children)
        /*
         *载入路由 
         */
        routerThis.options.routes = routes;
        routerThis.addRoutes(routes);
    },
}
