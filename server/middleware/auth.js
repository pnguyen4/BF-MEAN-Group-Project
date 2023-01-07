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

exports.verifyUser = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.json({status: '400', message: "Token required"});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.json({status: '400', message: "Token expired or invalid"});
        } else {
            req.user = payload;
            next();
        }
    });
}

exports.verifyEmployee = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.json({status: '400', message: "Token required"});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.json({status: '400', message: "Token expired or invalid"});
        } else {
            if (!payload.admin) {
                req.user = payload;
                next();
            } else return res.json({status: '400', message: "Account not employee."});
        }
    });
}

exports.verifyHr = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.json({status: '400', message: "Token required"});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.json({status: '400', message: "Token expired or invalid"});
        } else {
            if (payload.admin) {
                req.user = payload;
                next();
            } else return res.json({status: '400', message: "Account not HR."});
        }
    });
}
