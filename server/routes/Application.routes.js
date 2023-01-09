const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.get('/api/applications/:id', controller.getApplicationById);
router.get('/api/applications', controller.getApplicationAll);

module.exports = router;



