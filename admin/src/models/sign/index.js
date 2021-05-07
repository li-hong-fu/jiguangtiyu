import request from "../request";
import { login } from "../api/sign";

export default {
    login: function (data) {
        return request.post(login.login, data)
    }
}