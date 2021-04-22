const User = require('../../models/admin/user');

const userController = {
    list: async function (req, res, next) {
        try {
            const users = await User.all()
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, e })
        }
    }
}

module.exports = userController