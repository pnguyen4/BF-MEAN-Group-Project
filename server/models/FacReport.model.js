const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const FacReportSchema = new mongoose.Schema({
    housing_id: {
        type: objectID, ref: "Housing",
        required: [ true, "Facility reports must be associated with a housing unit." ]
    },
    author_id: {
        type: objectID, ref: "User",
        required: [ true, "Facility reports must specify the report of the issue." ]
    },
    status: {
        type: String,
        enum: [ "open", "in-progress", "closed" ],
        required: [ true, "Facility reports must have a status" ],
        default: "open"
    },
    title: {
        type: String,
        required: [ true, "Facility reports must have a title." ]
    },
    description: {
        type: String,
        required: [ true, "Facility reports must describe the issue." ]
    },
    messages: [{
        type: objectID,
        ref: "FacReportMsg"
    }]
}, {timestamps: true});

module.exports = FacReportSchema;
module.exports.FacReport = mongoose.model("FacReport", FacReportSchema);