const router = require("express").Router();
const controller = require("../controllers/User.controller.js");

module.exports = function(app){
    app.post('/seed/users', controller.seedUsers);
}
