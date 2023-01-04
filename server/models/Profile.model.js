const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
    email: { type: String,
        required: [true, 'Profile must contain an email'] ,
        // unique: true, 
    },
    user: { type: objectID, ref: 'User',
        // required: [true, 'User must be linked to a profile']
    },
    firstname: { type: String, 
        // required: [true, 'First name must be provided'] 
    },
    lastname: {  type: String, 
        // required: [true, 'Last name must be provided'] 
    },
    middlename: {  type: String, 
        required: false 
    },
    preferredname: {  type: String, 
        required: false 
    },
    address: { type: objectID, ref: 'Address',
        // required: [true, 'Address is required']
    },
    cellphone: { type: Number, unique: true
        // required: [true, 'Cell number must be provided'],
    },
    workphone: { type: Number, unique: true,
        // required: [ true, 'Work number must be provided' ]
    },
    ssn: { type: Number, unique: true, 
        // required: [true, 'SSN is required']
    },
    emergencyContact: { type: objectID, ref: 'EmergencyContact',
        // required: [true, 'Emergency Contact must be provided']
    },
}, {timestamps: true});

module.exports = ProfileSchema;
module.exports.Profile = mongoose.model("Profile", ProfileSchema);