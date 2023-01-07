const { User } = require('../models/User.model');
const { Housing } = require('../models/Housing.model');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");

exports.getHousingDetails = async (req, res) => {
    try {
        const house = await Housing.findOne({_id: req.params.id});
        return res.json({status: '200', house});
    } catch (error) {
        console.log(error);
        return res.json({status: "500", msg: error});
    }
};
