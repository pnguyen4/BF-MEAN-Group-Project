const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.get('/api/applications/:id', controller.getApplicationById);
router.post('/api/applications/', controller.createApplication);

module.exports = router;

