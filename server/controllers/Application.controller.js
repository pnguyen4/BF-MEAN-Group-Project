const { Application } = require('../models/Application.model');
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
        let application = await Application.create(req.body.application);
        return res.json({status: '200', application});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
}
//router.post('/api/applications/', controller.createApplication);
