import axios from "axios";

axios.defaults.timeout = 20000;


// 添加一个请求拦截器（ 一般用于鉴权 )
axios.interceptors.request.use(
    config => {
        const newConfig = { ...config };
        console.log(newConfig)
        // const TOKEN = DataStore.getToken();
        // if (TOKEN) {
        //     newConfig.headers.Authorization = `Bearer ${TOKEN}`;
        // }
        // return newConfig;
    },
    error => Promise.reject(error)
);

// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        // 兼容包了一层 { code, data } 的情况
        switch (true) {
            case res.data && res.data.code === 200:
                return res.data;
            case res.data && res.data.code !== 200:
                this.$msg.error(res.data.code);
                return Promise.reject(res.data);
            default:
                return res.data;
        }
    },
    error => {
        // handleErrorRequest(error);
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