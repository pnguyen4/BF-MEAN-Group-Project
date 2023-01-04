const mongoose = require('mongoose');

const HousingSchema = new mongoose.Schema({

}, {timestamps: true});

module.exports = HousingSchema;
module.exports.Housing = mongoose.model("Housing", HousingSchema);