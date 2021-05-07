const crypto = require('crypto');

const CSRF = {
    // 生成随机数
    generateRandom: function (len) {
        return crypto.randomBytes(Math.ceil(len * 3 / 4)).toString('base64').slice(0, len);
    },

    //设置Token
    getToken: function (req, res, next) {
        // 获取当前 session 的 csrf_token。
        var token = req.session._csrf;
        // 获取请求过来的 csrf 参数的 token
        var _csrf = req.query.csrf ? req.query.csrf : (req.query.csrf = req.body.csrf);

        if (_csrf != token) {
            res.writeHead(403);
            res.end("禁止访问");
        } else {
            next
        }
    },

    setToken: function (req, res, next) {
        // 获取当前 session 是否有 csrf_token
        // 如果是没有关闭浏览器多次刷新的话，就有，使用原来的
        // 如果是新打开浏览器第一次请求的页面，没有就新建一个
        var token = req.session._csrf || (req.session._csrf = CSRF.generateRandom(24));
        // 把token设置在本地数据中，页面获取本地数据渲染到页面
        res.locals.csrf = token;
        next();
    }
}

module.exports = CSRF;