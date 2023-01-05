const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const HousingSchema = new mongoose.Schema({
    idx: {
        type: Number,
        required: false
    },
    address: {
        street: { type: String, 
            // required: [true, 'Street is required']
        },
        suiteOrAptNumber: { type: String, 
            default: null,
            // required: false
        }, 
        city: { type: String, 
            // required: [true, 'Street is required']
        },
        state: { type: String, 
            // required: [true, 'State must be included'],
        }, 
        zipcode: { type: String, 
            // required: [ true, 'Zipcode must be included' ] 
        }, 
    },
    tenants: [{ type: objectID, ref: "User" }]
}, {timestamps: true});

module.exports = HousingSchema;
module.exports.Housing = mongoose.model("Housing", HousingSchema);