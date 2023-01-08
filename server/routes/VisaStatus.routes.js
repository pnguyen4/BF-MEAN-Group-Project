const controller = require("../controllers/VisaStatus.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.get('/api/visaStatus/:id', controller.getVisaById);

module.exports = router;
