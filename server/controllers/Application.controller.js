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

exports.getApplicationWithVisa = async function (req, res) {
    let copy = await Application.findOne({_id:req.params.id},{}).populate('visaStatus');
    res.status(200).json({app:copy});
}

exports.getApplicationAll = async function (req,res) {
    let copy = await Application.find({},{}); 
    res.status(200).json({app:copy});    
}

exports.getApplicationAllWithVisa = async function (req, res) {
    let copy = await Application.find({},{}).populate('visaStatus');
    res.status(200).json({app:copy});
}

exports.createApplication = async function (req, res) {
    try {
        if (!req.body.application) {
            return res.json({status: '400', msg: 'missing application'});
        }
        let newapplication = req.body.application;
        // delete old versions when updating
        await Application.deleteMany({user_id: newapplication.user_id});
        newapplication.status = "pending";
        const application = await Application.create(newapplication);

        await User.updateOne({_id: req.body.application.user_id},
                             {application_id: application._id});

        let newVisaStatus = req.body.visaStatus;
        console.log(JSON.stringify(newVisaStatus))
        const { OPTReceiptUrl, workAuth, startDate, endDate } = newVisaStatus;
        if (OPTReceiptUrl && workAuth && startDate && endDate) {
            newVisaStatus.user_id = req.body.application.user_id;
            newVisaStatus.application_id = application._id;
            const visaStatus = await VisaStatus.create(newVisaStatus);
            await Application.updateOne({_id: application._id}, {visaStatus});
            return res.json({status: '200', application, visaStatus});
        }

        return res.json({status: '200', application});
    } catch (error) {
        console.log(error);
        return res.json({status: "500", msg: error});
    }
}

// make this publically accessible, hide the rest away for security
exports.getApplicationStatus = async function (req, res) {
    try {
        let application = await Application.findOne({_id:req.params.id},{});
        return res.json({status: '200', status: application.status});
    } catch (error) {
        return res.json({status: '500', msg: error});
    }
}

exports.updateApplication = async function (req, res) {
    try {
        await Application.updateOne({_id: req.body.id},
                                    {...req.body.values});
        return res.json({status: '200'});
    } catch (error) {
        return res.json({status: '500', msg: error});
    }
}
