const mongoose = require('mongoose');

const OnboardingAppSchema = new mongoose.Schema({

}, {timestamps: true});

module.exports = OnboardingAppSchema;
module.exports.OnboardingApp = mongoose.model("OnboardingApp", OnboardingAppSchema);