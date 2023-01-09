const { User } = require('../models/User.model');
const { RegToken } = require('../models/RegToken.model');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ObjectId } = require('mongodb');

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
      // almost forgot to do this, but mark the token used by this employee as successfully registered
      const token = req.headers.authorization;
      const regtoken = await RegToken.updateOne(
        {link: {"$regex": token, "$options": "i"}},
        {registered: true}
      );
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
        admin:copy.admin
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

exports.getUserAll = async function (req,res) { 
    let copy = await User.find({},{}); 
    res.status(200).json({users:copy});    
} 

exports.getUserByKeyword = async function (req,res) { 
    let copy = await User.find({},{}); 
    let users = [];
    for (let i = 0; i < copy.length; i++) {
        if (copy[i].username.includes(req.params.keyword) || copy[i].email.includes(req.params.keyword)) {
            users.push(copy[i]);
        }
    }
    res.status(200).json({users:users});    
} 

exports.editUserWithPassword = async function (req,res) {

    const hashed = await bcrypt.hash(req.body.password, Number(process.env.SALT));
    const copy = await User.findOne({email:req.body.email},{});
    await User.findOneAndUpdate({email:req.body.email},{
      username: req.username,//req.body.username,
      email: req.body.email,
      admin: req.body.admin,
      password: hashed,
      application_id: ObjectId(req.body.application_id),
      housing_id: ObjectId(req.body.housing_id)
    })
    res.status(200).json();
  }



