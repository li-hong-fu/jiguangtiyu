import axios from "axios";
import msg from "../utils/msg";
import storage from "../utils/storage";
import router from "../router/index";

axios.defaults.timeout = 20000;


// 请求拦截器
axios.interceptors.request.use(
    config => {
        const newConfig = { ...config };
        const TOKEN = storage.get('token')
        if (TOKEN) {
            newConfig.headers.Authorization = `Bearer ${TOKEN}`;
        }
        return newConfig;
    },
    error => Promise.reject(error)
);

//全局错误处理
const handleErrorRequest = error => {
    const { response } = error;
    const status = response ? response.status : 408;
    if (response) {
        const { data } = response;
        const { errors } = data;
        const message = data.message || "服务器发送错误，请稍后再试";

        if (status === 401) {   //未授权登录
            msg.error('未登录')
            setTimeout(() => {
                router.push({ name: 'Login' })
            }, 1000)
        } else if (status === 419) {  //验证授权超时
            msg.error('页面已过期')
            setTimeout(() => {
                router.push({ name: 'Login' })
            }, 1000)
        } else if (status === 422 || status === 423 || status === 429) { //请求格式、资源错误
            Object.keys(errors).forEach(errorKey => {
                const errorValue = errors[errorKey].join("\n");
                msg.error(errorValue)
            })
        } else {
            msg.error(message)
        }
    } else {
        msg.error('网络超时')
    }

}

// 响应拦截器
axios.interceptors.response.use(
    res => {
        // 兼容包了一层 { code, data } 的情况
        switch (true) {
            case res.data && res.data.code === 200:
                return res.data;
            case res.data && res.data.code != 200:
                msg.error(res.data.msg);
                return res.data
            default:
                return res.data;
        }
    },
    error => {
        handleErrorRequest(error);
        return Promise.reject(error);
    }
);

export default {
    post: function (url = "", data = {}, config) {
        return axios.post(url, data, config);
    },

    put: function (url = "", data = {}, config) {
        return axios.put(url, data, config);
    },

    get: function (url, params = {}, config) {
        let OPTIONS = Object.assign({ params }, config);
        return axios.get(url, OPTIONS);
    },

    delete: function (url = "", params = {}, config) {
        let OPTIONS = Object.assign({ params }, config);
        return axios.delete(url, OPTIONS);
    }
};