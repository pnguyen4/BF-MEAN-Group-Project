const controller = require("../controllers/Housing.controller");
const router = require("express").Router();
const { verifyToken, verifyEmployee, verifyHr } = require("../middleware/auth");

router.get('/api/housing/:id', [verifyToken], controller.getHousingDetails);
router.get('/api/housing', [verifyToken], controller.getHousingSummary);
router.post('/api/housing', [verifyToken], controller.createHousing);
router.delete('/api/housing/:id', [verifyToken], controller.deleteHousing);

router.get('/api/housing/:id/reports', [verifyToken], controller.getHouseFacilityReports);
router.post('/api/housing/:id/reports', [verifyToken], controller.createFacilityReport);

router.get('/api/housing/:houseid/reports/:reportid', [verifyToken], controller.getOneFacReport);
router.put('/api/housing/:houseid/reports/:reportid', [verifyToken], controller.updateFacReportStatus);
router.post('/api/housing/:houseid/reports/:reportid/msg', [verifyToken], controller.addMsgToFacilityReport);
router.put('/api/housing/:houseid/reports/:reportid/msg/:msgid', [verifyToken], controller.editMsgOnFacilityReport);

module.exports = router;
