const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const ApplicationSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required to link to user']
    },
    user_id: { 
        type: objectID, ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: [ 'unsubmitted', 'rejected', 'pending', 'approved' ],
        default: 'unsubmitted',
        required: [true, 'App status is required'],
    },
    firstname: { 
        type: String, 
        required: [true, 'First name must be provided']
    },
    lastname: {  
        type: String, 
        required: [true, 'Last name must be provided']
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
        street: {
            type: String,
            required: [true, 'Street is required']
        },
        suiteOrAptNumber: { type: String, 
            required: false, default: null
        }, 
        city: {
            type: String,
            required: [true, 'Street is required']
        },
        state: {
            type: String,
            required: [true, 'State must be included'],
        }, 
        zipcode: {
            type: String,
            required: [ true, 'Zipcode must be included' ]
        }, 
    },
    cellphone: { 
        type: String,
        // unique: true
        // required: [true, 'Cell number must be provided'],
    },
    workphone: { 
        type: String,
        // unique: true,
        // required: [ true, 'Work number must be provided' ]
    },
    ssn: { 
        type: Number, // note: remove required unique, makes testing impossible
        required: [true, 'SSN is required']
    },
    reference: { 
        firstname: { type: String, required: [true, 'First name of reference must be provided'] },
        lastname: { type: String, required: [true, 'Last name of reference must be provided'] },
        phone: { type: String, required: [true, 'Phone contact of reference must be provided']},
        email: { type: String, required: [true, 'Email of reference must be provided'] },
    },
    emergencyContact: [{ 
        firstname: { type: String, required: [true, 'First name of emergency contact must be provided'] },
        lastname: { type: String, required: [true, 'Last name of emergency contact must be provided'] },
        phone: { type: String, required: [true, 'Phone contact of emergency contact must be provided']},
        email: { type: String, required: [true, 'Email of emergency contact must be provided'] },
    }],
    // moved citizenship out of visaStatus
    isCitizenUSA: {
        type: Boolean,
        required: [ true, "US citizenship status must be provided" ]
    },
    // moved workAuth out of visaStatus
    workAuthorization: { 
        type: String, 
        enum: [ 'green-card', 'citizen', 'h1b-etc', 'f1-etc', 'other' ],
        // required: [ true, 'Type of work authorization must be provided' ]
    },
    // changed visaStatus required from true to false
    visaStatus: { 
        type: objectID, ref: "VisaStatus", 
        required: false
    },
    driverLicense: {
        number: { type: String },
        expiration: { type: Date },
        imgUrl: { type: String },
    },
    feedback: {
        type: String
    }
}, {timestamps: true});

module.exports = ApplicationSchema;
module.exports.Application = mongoose.model("Application", ApplicationSchema);
