const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

}, {timestamps: true});

module.exports = ProfileSchema;
module.exports.Profile = mongoose.model("Profile", ProfileSchema);