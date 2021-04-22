const Menu = require('../../models/admin/menu');

const menuControllers = {
    list: async function (req, res, next) {
        try {
            const menus = await Menu.all();

            res.json({ code: 200, data: menus })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },

    insert: async function (req, res, next) {
        try {
            console.log(req.body)
            res.json({code:200,data:1})
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = menuControllers