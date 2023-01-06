const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

exports.verifyAuthToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({status: '400', message: "Token required"});
    }
    // will not successfully verify if token is expired
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.json({status: '400', message: "Token expired or invalid"});
        } else {
            req.user = payload;
            next();
        }
    });
}
