const { Application } = require('../models/Application.model');
const { User } = require('../models/User.model');
const { VisaStatus } = require('../models/VisaStatus.model');
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
        const application = await Application.create(newapplication);

        await User.updateOne({_id: req.body.application.user_id},
                             {application_id: application._id});

        let newVisaStatus = req.body.visaStatus;
        newVisaStatus.user_id = req.body.application.user_id;
        newVisaStatus.application_id = application._id;
        const visaStatus = await VisaStatus.create(newVisaStatus);
        await Application.updateOne({_id: application._id}, {visaStatus});

        return res.json({status: '200', application, visaStatus});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
}

// make this publically accessible, hide the rest away for security
exports.getApplicationStatus = async function (req, res) {
    try {
        let application = await Application.findOne({_id:req.params.id},{});
        res.json({status: '200', status: application.status});
    } catch (error) {

    }
}

exports.updateApplication = async function (req, res) {
    try {

    } catch (error) {

    }
}
