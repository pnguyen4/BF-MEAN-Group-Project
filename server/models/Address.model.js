const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: { 
        type: String, 
        // required: [true, 'Street is required']
    },
    // string because some apt#s include letters
    suiteOrAptNumber: {  
        type: String, 
        required: false,
        default: null
    }, 
    city: { 
        type: String, 
        // required: [true, 'Street is required']
    },
    
    // regex validators on state abbreviations?
    state: {  
        type: String, 
        // required: [true, 'State must be included'],
    }, 

    // zipcode string regex validator: can be 12345 or 12345-6789 format - or make it simple 5 digits
    zipcode: { 
        type: String, 
        // required: [ true, 'Zipcode must be included' ] 
    }, 
}, {timestamps: true});

module.exports = AddressSchema;
module.exports.Address = mongoose.model("Address", AddressSchema);