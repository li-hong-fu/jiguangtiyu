const knex = require('./knex');

class Base {
    constructor(props) {
        this.table = props;
    }

    all() {
        return knex(this.table).select()
    }

    //查询
    select(params) {
        return knex(this.table).select().where(params)
    }

    // 添加
    insert(params) {
        return knex(this.table).insert(params)
    }

    // 修改
    update(id, params) {
        return knex(this.table).where('id', '=', id).update(params)
    }

    // 删除
    delete(id) {
        return knex(this.table).where('id', '=', id).del()
    }
}

module.exports = Base;