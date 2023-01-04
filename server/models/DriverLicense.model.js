const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const DriverLicenseSchema = new mongoose.Schema({
    user_id: { 
        // reference userID? application ID? both?
        type: objectID, ref: "User", 
        required: [true, 'Visa status must be linked to a user ID']
    },
    application_id: {
        type: objectID, ref: 'Application',
        required: [true, 'License must be linked to an application form']
    },
    number: { 
        type: String, 
        unique: true,
        required: [true, "Driver's license must have a number"]  
    },
    expires: {
        type: Date,
        required: [true, 'DL must have expiration dates']
    },
    imgUrl: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = DriverLicenseSchema;
module.exports.DriverLicense = mongoose.model("DriverLicense", DriverLicenseSchema);