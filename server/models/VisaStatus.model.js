const mongoose = require('mongoose');

const VisaStatusSchema = new mongoose.Schema({

}, {timestamps: true});

module.exports = VisaStatusSchema;
module.exports.VisaStatus = mongoose.model("VisaStatus", VisaStatusSchema);