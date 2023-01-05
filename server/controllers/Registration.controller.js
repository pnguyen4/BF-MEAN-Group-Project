const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { RegToken } = require ('../models/RegToken.model');
const FRONTEND_URL = "http://localhost:4200";

exports.createRegToken = async (req, res) => {
    try {
        if (! (req.body.email && req.body.name)) {
            res.json({
              status: '401',
              message: 'cannot generate registration token without email or name'
            });
        }
        const email = req.body.email;
        const name = req.body.name;

        const token_payload = {
            email,
            name,
            expiresAt: (new Date()).setTime((new Date().getTime() + (3*60*60*1000)))
        };
        const token = jwt.sign(token_payload, process.env.JWT_KEY, { expiresIn: "3h"});
        // add to registration token history
        await RegToken.create({email, name, link: `${FRONTEND_URL}/${token}`});
        res.json({status: '200', token, message: 'registration link emailed and saved to history'});
    } catch (error) {
      res.json({status: '400', message: 'cannot create token'});
    }
};

exports.getRegTokens = async (req, res) => {
    try {
      const regtokens = await RegToken.find();
      res.json({status: '200', regtokens});
    } catch (error) {
      res.json({status: '400', message: 'cannot retrieve registration link history'});
    }
}
