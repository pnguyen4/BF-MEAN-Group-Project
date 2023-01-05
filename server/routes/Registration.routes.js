const router = require("express").Router();
const controller = require("../controllers/Registration.controller.js");

// TODO: add auth middleware to check if user is signed in AND is HR admin
router.get('/api/regtokens', controller.getRegTokens);

// TODO: add auth middleware to check if user is signed in AND is HR admin
router.post('/api/regtokens', controller.createRegToken);

module.exports = router;
