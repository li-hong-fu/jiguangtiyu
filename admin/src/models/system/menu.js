import request from "../request";
import api from "../api";

export default {
    list: function (data = {}) {
        return request.get(api.menuList, data)
    },
    item: function (id, data = {}) {
        return request.get(api.menuItem(id), data)
    },
    insert: function (data = {}) {
        return request.post(api.menuAdd, data)
    }
}