const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const HousingSchema = new mongoose.Schema({
    idx: {
        type: Number,
        required: false
    },
    landlord: {
        fullname: { type: String,
        required: [true, 'Landlord name must be included']
        },
        phone: { type: String,
        required: [true, 'Landlord phone number must be included']
        },
        email: { type: String,
        required: [true, 'Landlord email must be included']
        }
    },
    address: {
        street: { type: String, 
        required: [true, 'Street is required']
        },
        suiteOrAptNumber: { type: String, 
            default: '',
            required: false
        }, 
        city: { type: String, 
        required: [true, 'Street is required']
        },
        state: { type: String, 
        required: [true, 'State must be included'],
        }, 
        zipcode: { type: String, 
        required: [ true, 'Zipcode must be included' ]
        }, 
    },
    facilities: {
        type: String,
        default: ''
    },
    tenants: [{ type: objectID, ref: "User" }]
}, {timestamps: true});

module.exports = HousingSchema;
module.exports.Housing = mongoose.model("Housing", HousingSchema);
