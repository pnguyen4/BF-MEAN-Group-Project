const controller = require("../controllers/User.controller.js");
const router = require("express").Router();
const checkAuth = require("../middleware/auth");

router.post('/api/users/:account', controller.checkUserByPassword);
router.get('/api/users/:account',controller.getUserByAccount);
router.post('/api/users', controller.createUser);

module.exports = router;
