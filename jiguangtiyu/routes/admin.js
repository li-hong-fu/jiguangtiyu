var express = require('express');
var router = express.Router();
var cors = require('../middlewares/cors');
var csrf = require('../middlewares/csrf');
var userController = require('../controllers/admin/user');
var menuController = require('../controllers/admin/menu');


/**
 * 登录与登出
 */
router.post('/login', userController.login);

/**
 * 菜单管理
 */
router.get('/sys/menu/list', cors.allowAll, menuController.list);
router.get('/sys/menu/detail/:id', cors.allowAll, menuController.detail);
router.post('/sys/menu/add', menuController.insert);
router.put('/sys/menu/edit/:id', menuController.edit);
router.delete('/sys/menu/del/:id', menuController.del);

/**
 * 用户管理
 */

router.get('/user/list', cors.allowAll, userController.list);

module.exports = router;
