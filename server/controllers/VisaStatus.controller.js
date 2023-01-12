const { VisaStatus } = require('../models/VisaStatus.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ObjectId } = require('mongodb');

exports.getVisaById = async function (req,res) { 
    let copy = await VisaStatus.find({_id:req.params.id},{}); 
    res.status(200).json({visa:copy});    
} 

exports.getVisaAll = async function (req,res) { 
    let copy = await VisaStatus.find({},{}); 
    res.status(200).json({visa:copy});    
} 

exports.editVisaById = async function (req,res) { 
    await VisaStatus.findOneAndUpdate({_id:req.params.id},{
        user_id: ObjectId(req.body.user_id),
        application_id: ObjectId(req.body.application_id),
        status: req.body.status,
        OPTReceiptUrl: req.body.OPTReceiptUrl,
        OPTEADurl: req.body.OPTEADurl,
        I983: req.body.I983,
        I20: req.body.I20,
        workAuth: req.body.workAuth,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })
    res.status(200).json();    
} 

exports.editVisaApprove = async function (req,res) { 
    await VisaStatus.updateOne({_id:req.params.id},{status:'done'}); 
    res.status(200).json();    
} 

exports.editVisaReject = async function (req,res) { 
    await VisaStatus.updateOne({_id:req.params.id},{status:'rejected'}); 
    res.status(200).json();    
} 







