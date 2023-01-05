const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const HousingSchema = new mongoose.Schema({
    address: {
        type: objectID, ref: "Address",
        required: true
    },
    tenants: [{ type: objectID, ref: "User" }]
}, {timestamps: true});

module.exports = HousingSchema;
module.exports.Housing = mongoose.model("Housing", HousingSchema);