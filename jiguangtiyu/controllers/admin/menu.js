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

    detail: async function (req, res, next) {
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
    },

    edit: async function (req, res, next) {
        try {
            let id = req.params.id;
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
                update_time: new Date().getTime()
            }

            await Menu.update(id, params)
            res.json({ code: 200, data: '成功修改' })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },

    del: async function (req, res, next) {
        try {
            let id = req.params.id;
            await Menu.delete(id)

            res.json({ code: 200, data: '成功删除' })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = menuControllers