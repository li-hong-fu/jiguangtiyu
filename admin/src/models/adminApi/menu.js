import request from "../request";
import api from "../api";

export default {
    list: function () {
        return request.get(api.menuList)
    },
    insert: function (data) {
        return request.post(api.menuAdd, data)
    }
}