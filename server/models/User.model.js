const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true,
        // required: [true, 'User name is required to register a user'],
    },
    email: { type: String, unique: true,
        // required: [true, 'Email is required to register a user']
    },
    password: { type: String,
        // required: [true, 'Password is required to register user'],
    },
    status: { type: String, enums: [ 'Admin', 'Pending', 'Approved', 'Rejected'], default: 'Pending'
        // required: [true, 'Employee status must be provided'],
    },
    profile: { type: objectID, ref: 'Profile'
        // required: [true, 'User must be linked to a profile']
    },
    onboardingApp: { type: objectID, ref: 'OnboardingApp',
        required: false
    },
    housing: { type: objectID, ref: 'Housing',
        required: false
    },
    visaStatus: { type: objectID, ref: 'VisaStatus',
        // required: true
    }

}, {timestamps: true});

module.exports = UserSchema;
module.exports.User = mongoose.model("User", UserSchema);