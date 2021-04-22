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
                children: []
            },
            // 404
            {
                path: '/404',
                hidden: true,
                redirect: () =>
                    import('@/views/Error404')
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
                    component: { render: h => h("router-view") },
                })
            }


            routes[0].children.forEach((arr, index) => {
                if (arr.id == data.pid) {
                    const routerUrl = () =>
                        import(/* webpackChunkName: "routerUrl" */ "@/views" + `${data.router}` + "/Index.vue");
                    routes[0].children[index].children.push({
                        path: data.router,
                        component: routerUrl
                    })
                }

            })
        })

        /*
         *载入路由 
         */
        routerThis.addRoutes(routes)

    },
}
