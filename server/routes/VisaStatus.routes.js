const controller = require("../controllers/VisaStatus.controller.js");
const router = require("express").Router();
const { verifyToken, verifyHr, verifyEmployee }= require("../middleware/auth");

router.post('/api/visaStatus/:id', [verifyToken], controller.editVisaById);
router.put('/api/visaStatus/:id', [verifyToken, verifyHr], controller.editVisaApprove);
router.put('/api/visaStatus/:id/:id', [verifyToken, verifyHr], controller.editVisaReject);
router.get('/api/visaStatus', [verifyToken], controller.getVisaAll);

module.exports = router;


