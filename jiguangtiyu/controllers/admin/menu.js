const Menu = require('../../models/admin/menu');
const { param } = require('../../routes/admin');

const menuControllers = {
    list: async function (req, res, next) {
        try {
            const menus = await Menu.all();

            res.json({ code: 200, data: menus })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },

    item: async function (req, res, next) {
        try {
            let id = req.params.id
            const item = await Menu.select({ id })

            res.json({ code: 200, data: item[0] })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },

    insert: async function (req, res, next) {
        try {

            let params = {
                pid: req.body.pid,
                title: req.body.name,
                type: req.body.type,
                code: req.body.code || null,
                icon: req.body.icon || null,
                url: req.body.url || null,
                router: req.body.router || null,
                display: req.body.display,
                sort: req.body.sort,
                created_time: new Date().getTime()
            }

            await Menu.insert(params)

            res.json({ code: 200, data: '添加成功' })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = menuControllers