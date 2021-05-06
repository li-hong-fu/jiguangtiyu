const User = require('../../models/admin/user');
const authCodeFunc = require('../../utils/authCode');


const userController = {
    /**
     * 登录
     */
    login: async function (req, res, next) {
        try {
            let username = req.body.username;
            let password = req.body.password;
            if (!username || !password) {
                res.json({ code: 0, msg: '账号密码不能为空' });
                return
            }

            const users = await User.select({ username, password });
            const user = users[0]

            if (user) {
                let auth_Code = username + '\t' + password + '\t' + user.uid + '\t' + user.role_id;
                auth_Code = authCodeFunc(auth_Code, 'ENCODE');
                // res.cookie('ac', auth_Code, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.json({ code: 200, msg: '登录成功', token: auth_Code })
            } else {
                res.json({ code: 0, msg: '没有此用户' })
            }

        } catch (e) {
            res.json({ e })
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