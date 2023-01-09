const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.get('/api/applications/:id', controller.getApplicationById);

router.get('/api/applications', controller.getApplicationAll);

router.post('/api/applications/', controller.createApplication);

router.put('/api/applications/:id', controller.updateApplication);

router.get('/api/applications/:id/status', controller.getApplicationStatus);

router.get('/api/applications/:id/withvisa', controller.getApplicationWithVisa);

module.exports = router;



