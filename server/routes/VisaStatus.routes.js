const controller = require("../controllers/VisaStatus.controller.js");
const router = require("express").Router();
const { verifyAuthToken } = require("../middleware/auth");

router.post('/api/visaStatus/:id', controller.editVisaById);
router.put('/api/visaStatus/:id', controller.editVisaApprove);
router.put('/api/visaStatus/:id/:id', controller.editVisaReject);
router.get('/api/visaStatus', controller.getVisaAll);

module.exports = router;


