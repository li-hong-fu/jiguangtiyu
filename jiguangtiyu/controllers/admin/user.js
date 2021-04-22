const User = require('../../models/admin/user');

const userController = {
    /**
     * 登录
     */
    login: async function (req, res, next) {
        try {
            res.json({ code: 200, data: 123 })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    /**
     * 用户信息列表
     */
    list: async function (req, res, next) {
        try {
            const users = await User.all()
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, e })
        }
    },


}

module.exports = userController