var express = require('express');
var router = express.Router();
var cors = require('../middlewares/cors');
var csrf = require('../middlewares/csrf');
var userController = require('../controllers/admin/user');
var menuController = require('../controllers/admin/menu');

/**
 * 菜单管理
 */
router.get('/sys/menu/list', menuController.list);
router.post('/sys/menu/add', menuController.insert);

router.get('/user/list', csrf.setToken, cors.allowAll, userController.list)

module.exports = router;