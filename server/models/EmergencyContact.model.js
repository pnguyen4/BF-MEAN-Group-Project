const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
    firstname: { type: String, required: [true, 'First name must be provided'] },
    lastname: { type: String, required: [true, 'Last name must be provided'] },
    phone: { type: Number, required: [true, 'Phone contact must be provided']},
    email: { type: String, required: [true, 'Email must be provided'] },
    relationship: { type: String, required: false, default: 'N/A' }
}, {timestamps: true});

module.exports = EmergencyContactSchema;
module.exports.EmergencyContact = mongoose.model("EmergencyContact", EmergencyContactSchema);