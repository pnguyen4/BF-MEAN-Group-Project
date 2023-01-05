const { User } = require('../models/User.model');
const bcrypt = require('bcryptjs');
const hashKey = process.env.HASH_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function createUser( req, res ) {

}

async function getUserById( req, res ) {

}

async function seedUsers( req, res ) {
    let userList = [];
    try {
        const employeeCount = 10, adminCount = 3;
        for( let i=0; i<employeeCount; i++ ) {
            // create fake seed user info
            const username = `user-${i}`
            const email = `user-${i}@test.com`
            const password = `User${i}!pw123`
            const hashedPW = await bcrypt.hash(password, saltRounds);
            const admin = i < adminCount
                ? true
                : false

            // check for unique username/email
            const usernameCheck = await User.findOne({username});
            const emailCheck = await User.findOne({email});
            if( usernameCheck || emailCheck ) throw new Error(404);

            // create user with null return
            const newUser = await User.create({
                username, email, password: hashedPW, admin
            });
            if( !newUser ) throw new Error(404);
            newUser.save();

            userList.push(newUser);
        }
        return res.status(200).json(userList);
    } catch(e) {
        if( e.message === String('404') ) return res.status(404).json({error: "bad seed request"});
        else return res.status(500).json({error: "server error"});
    }
}

module.exports = {
    createUser,
    getUserById,
    seedUsers
}