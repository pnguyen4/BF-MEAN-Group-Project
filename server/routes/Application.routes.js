const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyToken, verifyHr, verifyEmployee } = require("../middleware/auth");

// note: removed auth middleware, client does not yet token in authorization header
router.get('/api/applications/:id', [verifyToken], controller.getApplicationById);

// NOTE: this change should not break anything but leave old functionality just incase
//router.get('/api/applications', controller.getApplicationAll);
router.get('/api/applications', [verifyToken], controller.getApplicationAllWithVisa);

router.post('/api/applications/', [verifyToken], controller.createApplication);

router.put('/api/applications/:id', [verifyToken], controller.updateApplication);

router.get('/api/applications/:id/status', [verifyToken], controller.getApplicationStatus);

router.get('/api/applications/:id/withvisa', [verifyToken], controller.getApplicationWithVisa);

module.exports = router;



