const { Application } = require('../models/Application.model');
const { User } = require('../models/User.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ObjectId } = require('mongodb');

exports.getApplicationById = async function (req,res) { 
    let copy = await Application.findOne({_id:req.params.id},{}); 
    res.status(200).json({app:copy});    
}

exports.getApplicationAll = async function (req,res) { 
    let copy = await Application.find({},{}); 
    res.status(200).json({app:copy});    
} 

exports.createApplication = async function (req, res) {
    try {
        if (!req.body.application) {
            return res.json({status: '400', msg: 'missing application'});
        }
        let newapplication = req.body.application;
        newapplication.status = "pending";
        let application = await Application.create(newapplication);
        await User.updateOne({_id: req.body.application.user_id},
                             {application_id: application._id});
        return res.json({status: '200', application});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
}
//router.post('/api/applications/', controller.createApplication);