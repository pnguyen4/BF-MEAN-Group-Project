const controller = require("../controllers/Application.controller.js");
const router = require("express").Router();
const { verifyUser, verifyHr } = require("../middleware/auth");

router.get('/api/applications/:id', [ verifyUser, verifyHr ], controller.getApplicationById);

module.exports = router;

