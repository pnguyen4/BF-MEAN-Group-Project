const controller = require("../controllers/User.controller.js");
const router = require("express").Router();
const { verifyToken, verifyHr, verifyEmployee } = require("../middleware/auth");

router.get('/api/users/:keyword/:keywordCopy', [verifyToken], controller.getUserByKeyword);

// NOTE: this is the ONLY route that does not require token because it retrievs it.
// Send user data in POST request and _only_ return signed token for security
// Only server can decrypt token to look inside
router.post('/api/users/signin', controller.signin);

router.put('/api/users/:email', [verifyToken], controller.editUserWithPassword);
router.post('/api/users', controller.createUser);
router.get('/api/users', [verifyToken], controller.getUserAll);

module.exports = router;
