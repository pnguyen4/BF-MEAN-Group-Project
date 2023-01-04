const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const ApplicationSchema = new mongoose.Schema({
    email: { 
        type: objectID, 
        required: [true, 'Email is required to link to user']
    },
    user_id: { 
        type: objectID, ref: 'User',
        // required: false, default: null
    },
    status: {
        type: String,
        enums: [ 'unsubmitted', 'rejected', 'pending', 'approved' ],
        default: 'unsubmitted',
        required: [true, 'App status is required'],
    },
    firstname: { 
        type: String, 
        // required: [true, 'First name must be provided'] 
    },
    lastname: {  
        type: String, 
        // required: [true, 'Last name must be provided'] 
    },
    middlename: {  
        type: String, 
        required: false,
        default: null
    },
    preferredname: {  
        type: String, 
        required: false,
        default: null
    },
    address: { 
        type: objectID, ref: 'Address',
        // required: [true, 'Address is required']
    },
    cellphone: { 
        type: Number, 
        // unique: true
        // required: [true, 'Cell number must be provided'],
    },
    workphone: { 
        type: Number, 
        // unique: true,
        // required: [ true, 'Work number must be provided' ]
    },
    ssn: { 
        type: Number, unique: true, 
        // required: [true, 'SSN is required']
    },
    reference: { 
        type: objectID, ref: "Contact",
        required: false,
        default: null
    },
    emergencyContact: [{ 
        type: objectID, ref: 'Contact', 
        // required: [true, 'Emergency Contact must be provided'] 
    }],
    visaStatus: { 
        type: objectID, ref: "VisaStatus", 
        required: [true, "Applicant's visa status must be provided" ]
    },
    driversLicense: { 
        type: objectID, 
        ref: "DriverLicense", 
        default: null
    }
}, {timestamps: true});

module.exports = ApplicationSchema;
module.exports.Application = mongoose.model("Application", ApplicationSchema);