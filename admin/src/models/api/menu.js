// 菜单管理
export const menu = {
    getList: '/api/sys/menu/list',
    add: '/api/sys/menu/add',
    update: (id) => `/api/sys/menu/edit/${id}`,
    getById: (id) => `/api/sys/menu/detail/${id}`,
    del: (id) => `/api/sys/menu/del/${id}`
};