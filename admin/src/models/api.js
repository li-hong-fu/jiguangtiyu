export default {
    /**
     * 登录与登出
     */
    login: "/api/login",


    /**
     * 菜单管理
     */
    menuList: "/api/sys/menu/list",
    menuItem: (id) => `/api/sys/menu/list/${id}`,
    menuAdd: "/api/sys/menu/add"
}
