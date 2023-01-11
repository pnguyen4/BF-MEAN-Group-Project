const router = require("express").Router();
const controller = require("../controllers/Registration.controller.js");
const { verifyToken, verifyEmployee, verifyHr } = require("../middleware/auth");

router.post('/api/regtokens/:email', [verifyToken, verifyHr], controller.statusReport);
router.get('/api/regtokens', [verifyToken, verifyHr], controller.getRegTokens);
router.post('/api/regtokens', [verifyToken, verifyHr], controller.createRegToken);

module.exports = router;
