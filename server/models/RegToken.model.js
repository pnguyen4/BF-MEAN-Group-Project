const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = mongoose.Types.ObjectId;

const RegTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  registered: {
    type: Boolean,
    default: false
  }
});

module.exports = RegTokenSchema;
module.exports.RegToken = mongoose.model("RegToken", RegTokenSchema);
