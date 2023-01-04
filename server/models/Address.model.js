const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: {
        type: String, 
        required: [true, 'Street is required']
    },
    suiteOrAptNumber: { 
        type: String, 
        required: false
    }, // string because some apt#s include letters
    city: {
        type: String, 
        required: [true, 'Street is required']
    },
    state: { 
        type: String, 
        required: [true, 'State must be included'] 
    }, // validators on state abbreviations?
    zipcode: { 
        type: String, 
        required: [ true, 'Zipcode must be included' ] 
    }, // zipcode string regex validator: can be 12345 or 12345-6789 format - or make it simple 5 digits
}, {timestamps: true});

module.exports = AddressSchema;
module.exports.Address = mongoose.model("Address", AddressSchema);