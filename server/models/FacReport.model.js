const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const FacReportSchema = new mongoose.Schema({
    housing_id: {
        type: objectID,
        ref: "Housing",
        required: true
    },
    author_id: {
        type: objectID,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: [ "open", "in-progress", "closed" ],
        required: true,
        default: "open"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    messages: [{
        type: objectID,
        ref: "FacReportMsg"
    }]
}, {timestamps: true});

module.exports = FacReportSchema;
module.exports.FacReport = mongoose.model("FacReport", FacReportSchema);