import request from "../request";
import api from "../api";

export default {
    login: function (data) {
        return request.post(api.login, data)
    }
}