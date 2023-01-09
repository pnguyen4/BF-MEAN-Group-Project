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

        return res.json({status: '200', application, visaStatus});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
}
