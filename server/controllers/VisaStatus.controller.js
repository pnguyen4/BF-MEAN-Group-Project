const { VisaStatus } = require('../models/VisaStatus.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ObjectId } = require('mongodb');

exports.getVisaById = async function (req,res) { 
    let copy = await VisaStatus.findOne({_id:req.params.id},{}); 
    res.status(200).json({visa:copy});    
} 
