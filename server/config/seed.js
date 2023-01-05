const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env'));
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const { generateUsers } = require('./seed.utils/User.seed');
const { User } = require("../models/User.model");


async function run() {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Connected to the DB.");
    
    // db reset
    await User.collection.drop();

    // [top][ USER ] seed function arguments = ( totalUsers=10, numberOfAdmins=3 )
    let userCount = 10, adminCount = 3;
    const userList = await generateUsers(userCount, adminCount);
    for( let i=0; i<userList.length; i++ ) {
      const user = userList[i]
      const newUser = await User.create({...user});
      newUser.save();
    }
    // [end][USER]
  } catch (error) {
    console.log(error)
  } finally {
    // setTimeout because connection was closing faster than it takes for the seed to be created
    setTimeout(() => {mongoose.connection.close() }, 1500 )
  }
}

run().catch(console.dir)
