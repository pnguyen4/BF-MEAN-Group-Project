const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyUser, verifyHr } = require("../middleware/auth");

// note: removed auth middleware, client does not yet token in authorization header
router.get('/api/applications/:id', controller.getApplicationById);

// NOTE: this change should not break anything but leave old functionality just incase
//router.get('/api/applications', controller.getApplicationAll);
router.get('/api/applications', controller.getApplicationAllWithVisa);

router.post('/api/applications/', controller.createApplication);

router.put('/api/applications/:id/:id', controller.editApplicationById);

router.put('/api/applications/:id', controller.updateApplication);

router.get('/api/applications/:id/status', controller.getApplicationStatus);

router.get('/api/applications/:id/withvisa', controller.getApplicationWithVisa);

module.exports = router;



