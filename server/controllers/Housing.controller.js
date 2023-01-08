const { User } = require('../models/User.model');
const { Housing } = require('../models/Housing.model');
const { FacReport } = require('../models/FacReport.model');
const { FacReportMsg } = require('../models/FacReportMsg.model');
const { Application } = require('../models/Application.model');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");

exports.getHousingDetails = async (req, res) => {
    try {
        // Nested references are a BITCH. I'm not sorry for this comment - Phillip
        const house = await Housing.findOne({_id: req.params.id}).populate({
            path: 'tenants',
            model: 'User',
            populate: {
                path: 'application_id',
                model: 'Application'
            }
        });
        return res.json({status: '200', house});
    } catch (error) {
        console.log(error);
        return res.json({status: "500", msg: error});
    }
};

exports.getHousingSummary = async (req, res) => {
    try {
        const houses = await Housing.find();
        return res.json({status: '200', houses});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
};

exports.createHousing = async (req, res) => {
    try {
        const newhouse = {
            landlord: req.body.landlord,
            address: req.body.address,
            facilities: req.body?.facilities ?? ''
        };
        const house  = await Housing.create(newhouse);
        return res.json({status: '200', house});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
};

exports.deleteHousing = async (req, res) => {
    try {
        await Housing.deleteOne({ _id: req.params.id });
        return res.json({status: '200'});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
};

exports.getHouseFacilityReports = async (req, res) => {
    try {
        const id = req.params.id;
        const facReports = await FacReport.find({housing_id: id});
        return res.json({status: '200', facReports});
    }
    catch (error) {
        return res.json({status: "500", msg: error});
    }
};

exports.createFacilityReport = async (req, res) => {
    try {
        const newreport = {
            housing_id: req.body.housing_id,
            author_id: req.body.author_id,
            status: "open",
            title: req.body.title,
            description: req.body.description,
            messages: []
        };
        const facReport = await FacReport.create(newreport);
        return res.json({status: '200', facReport});
    } catch (error) {
        return res.json({status: "500", msg: error});
    }
}
