const controller = require("../controllers/User.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.get('/api/users/:keyword/:keywordCopy', controller.getUserByKeyword);
router.post('/api/users/:account', controller.checkUserByPassword);
router.get('/api/users/:account',controller.getUserByAccount);
router.put('/api/users/:email', controller.editUserWithPassword);
router.post('/api/users', verifyAuthToken, controller.createUser);
router.get('/api/users',controller.getUserAll);


module.exports = router;
