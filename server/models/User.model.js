const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true,
        // required: [true, 'User name is required to register a user'],
    },
    email: { 
        type: String, 
        unique: true,
        // required: [true, 'Email is required to register a user']
    },
    password: { 
        type: String,
        // required: [true, 'Password is required to register user'],
    },
    admin: { 
        type: Boolean, 
        default: false,
        // required: [true, 'Employee status must be provided'],
    },
    application_id: { 
        type: objectID, ref: 'Application',
        required: false
    },
    housing_id: { 
        type: objectID, ref: 'Housing',
        required: false
    },
    driverLicense: {
        number: { type: String, required: true },
        expiration: { type: Date, required: true },
        imgUrl: { type: String, required: false, default: null }
    }
}, {timestamps: true});

module.exports = UserSchema;
module.exports.User = mongoose.model("User", UserSchema);