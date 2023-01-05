const { User } = require('../models/User.model');
const bcrypt = require('bcryptjs');
const hashKey = process.env.HASH_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function createUser( req, res ) {

}

async function getUserById( req, res ) {

}

module.exports = {
    createUser,
    getUserById,
}