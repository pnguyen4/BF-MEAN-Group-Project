const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const FacReportMsgSchema = new mongoose.Schema({
    housing_id: {
        type: objectID, ref: "Housing",
        required: true
    },
    author_id: {
        type: objectID, ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = FacReportMsgSchema;
module.exports.FacReportMsg = mongoose.model("FacReportMsg", FacReportMsgSchema);