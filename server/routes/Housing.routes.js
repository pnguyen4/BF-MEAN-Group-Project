const controller = require("../controllers/Housing.controller");
const router = require("express").Router();
const { verifyUser, verifyEmployee, verifyHr } = require("../middleware/auth");

// TODO: add respective middlewares, first need to add http interceptor on client to add token to header
router.get('/api/housing/:id', controller.getHousingDetails);
router.get('/api/housing', controller.getHousingSummary);
router.post('/api/housing', controller.createHousing);
router.delete('/api/housing/:id', controller.deleteHousing);

router.get('/api/housing/:id/reports', controller.getHouseFacilityReports);
router.post('/api/housing/:id/reports', controller.createFacilityReport);

router.get('/api/housing/:houseid/reports/:reportid', controller.getOneFacReport);
router.post('/api/housing/:houseid/reports/:reportid/msg', controller.addMsgToFacilityReport);
router.put('/api/housing/:houseid/reports/:reportid/msg/:msgid', controller.editMsgOnFacilityReport);

module.exports = router;
