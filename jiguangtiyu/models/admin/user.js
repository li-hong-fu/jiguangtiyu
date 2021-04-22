const Base = require('../base');

class User extends Base {
    constructor(props = 'jgty_sys_admin') {
        super(props);
    }
}

module.exports = new User()