const controller = require("../controllers/Housing.controller");
const router = require("express").Router();
const { verifyUser, verifyEmployee, verifyHr } = require("../middleware/auth");

// TODO: add verifyUser middleware
router.get('/api/housing/:id', controller.getHousingDetails);
router.get('/api/housing', controller.getHousingSummary);
//router.post('/api/housing', controller.createHousing);
//router.delete('/api/housing', controller.deleteHousing);

module.exports = router;
