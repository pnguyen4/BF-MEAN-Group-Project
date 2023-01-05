const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const FacReportMsgSchema = new mongoose.Schema({
    housing_id: {
        type: objectID, ref: "Housing",
        required: [ true, "Facility report messages must be associated with a housing unit." ]
    },
    author_id: {
        type: objectID, ref: "User",
        required: [ true, "Facility report messages must be associated with an author." ]
    },
    message: {
        type: String,
        required: [ true, "Facility reports need to have an actual message" ]
    }
}, {timestamps: true});

module.exports = FacReportMsgSchema;
module.exports.FacReportMsg = mongoose.model("FacReportMsg", FacReportMsgSchema);