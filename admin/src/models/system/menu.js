import request from "../request";
import { menu } from "../api/menu"

export default {
    list: function (data = {}) {
        return request.get(menu.getList, data)
    },
    detail: function (id, data = {}) {
        return request.get(menu.getById(id), data)
    },
    insert: function (data = {}) {
        return request.post(menu.add, data)
    },
    update: function (id, data = {}) {
        return request.put(menu.update(id), data)
    },
    delete: function (id) {
        return request.delete(menu.del(id))
    }
}