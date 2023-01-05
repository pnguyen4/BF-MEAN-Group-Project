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
        enum: [ 'unsubmitted', 'rejected', 'pending', 'approved' ],
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
    currentAddress: { 
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
        firstname: { type: String, required: [true, 'First name of reference must be provided'] },
        lastname: { type: String, required: [true, 'Last name of reference must be provided'] },
        phone: { type: Number, required: [true, 'Phone contact of reference must be provided']},
        email: { type: String, required: [true, 'Email of reference must be provided'] },
        
        required: false,
        default: null
    },
    emergencyContact: [{ 
        firstname: { type: String, required: [true, 'First name of emergency contact must be provided'] },
        lastname: { type: String, required: [true, 'Last name of emergency contact must be provided'] },
        phone: { type: Number, required: [true, 'Phone contact of emergency contact must be provided']},
        email: { type: String, required: [true, 'Email of emergency contact must be provided'] },

        required: [ true, "At least one emergency contact must be provided" ]
    }],
    visaStatus: { 
        type: objectID, ref: "VisaStatus", 
        required: [true, "Applicant's visa status must be provided" ]
    },
    driverLicense: {
        number: { type: String, required: true },
        expiration: { type: Date, required: true },
        imgUrl: { type: String, required: false, default: null }
    },
}, {timestamps: true});

module.exports = ApplicationSchema;
module.exports.Application = mongoose.model("Application", ApplicationSchema);