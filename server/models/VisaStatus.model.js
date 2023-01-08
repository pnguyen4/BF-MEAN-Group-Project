const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const VisaStatusSchema = new mongoose.Schema({
    user_id: { 
        // reference userID? application ID? both?
        type: objectID, ref: "User", 
        required: [true, 'Visa status must be linked to a user ID']
    },
    application_id: {
        type: objectID, ref: 'Application',
        required: [true, 'Visa status must be linked to an application']
    },
    status: {
        type: String,
        enum: [ "pending", "done" ],
        required: [ true, "OPT status is required" ],
        default: "pending",
    },
    OPTReceiptUrl: { type: String, required: false, default: null },
    OPTEADurl: { type: String, required: false, default: null },
    I983: { type: String, required: false, default: null },
    I20: { type: String, required: false, default: null },
    workAuth: {
        type: String,
        enum: [ "J1", "F1" ],
        required: [ true, "Work Authenication is required" ],
        default: "pending",
    },
    startDate: {
        type: Date, 
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date, 
        required: [true, 'End date is required']
    }
}, {timestamps: true});

module.exports = VisaStatusSchema;
module.exports.VisaStatus = mongoose.model("VisaStatus", VisaStatusSchema);