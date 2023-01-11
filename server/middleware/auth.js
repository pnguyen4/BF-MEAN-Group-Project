const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

exports.verifyToken = async (req, res, next) => {
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

// NOTE: must be called after verifyToken
exports.verifyEmployee = async (req, res, next) => {
    console.log(req.user)
    next();
    /*
    if (!req.user.admin) {
        next();
    } else {
        return res.json({status: '403', message: "Account not employee."});
    }
    */
}

// NOTE: must be called after verifyToken
exports.verifyHr = async (req, res, next) => {
    console.log(req.user)
    next();
    /*
    if (req.user.admin) {
        next();
    } else {
        return res.json({status: '403', message: "Account not HR."});
    }
    */
}
