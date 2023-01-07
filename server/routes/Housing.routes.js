const controller = require("../controllers/Housing.controller");
const router = require("express").Router();
const { verifyUser, verifyEmployee, verifyHr } = require("../middleware/auth");

// TODO: add respective middlewares, first need to add http interceptor on client to add token to header
router.get('/api/housing/:id', verifyUser, controller.getHousingDetails);
router.get('/api/housing', controller.getHousingSummary);
//router.post('/api/housing', controller.createHousing);
router.delete('/api/housing/:id', controller.deleteHousing);

module.exports = router;
