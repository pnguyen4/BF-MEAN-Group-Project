const { User } = require('../models/User.model');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ObjectID } = require('mongodb');

// TODO: randomly assign a house from existing houses
exports.createUser = async ( req, res ) => {
    const hashed = await bcrypt.hash(req.body.password, Number(process.env.SALT));
    const user = new User({ // create schema
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      admin: req.body.admin,
    });
    const copy1 = await User.findOne({email:req.body.email},{}); // check if email already exist
    const copy2 = await User.findOne({username:req.body.username},{});  // check if username already exist
    if (copy1 === null && copy2 === null) { // if email not exist
      user.save().then(result => {
        res.status(200).json();
      });
    }
    else { // if email exist
        res.status(409).json();
    }
}    


exports.checkUserByPassword = async function (req,res) {
    let copy = await User.findOne({email:req.body.account},{});  // check if input is email
    if (copy === null) copy = await User.findOne({username:req.body.account},{});  // check if input is username
    if (copy && bcrypt.compareSync(req.body.password, copy.password)) { // found the exactly account and compare password
        res.status(200).json({});
    }
    else {
        res.status(500).json({});
    }
}

exports.getUserByAccount = async function (req,res) { 
    let copy = await User.findOne({email:req.params.account},{}); 
    if (copy === null) copy = await User.findOne({username:req.params.account},{}); 
    
    const token = jwt.sign(  // create token
    {
        userId:copy._id,
        username:copy.username,
        email:copy.email,
        admin:copy.admin // to check if user is HR or not in middleware and frontend
    },
        process.env.JWT_KEY,
        {expiresIn:'3h'}
    );      

    res.status(200).json({
        user: copy,
        token: token,
        expiresAt:(new Date()).setTime((new Date().getTime() + (3*60*60*1000)))
    });    
} 




