const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env'));
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

// models
const { User } = require("../models/User.model");
const { Application } = require('../models/Application.model');
const { VisaStatus } = require("../models/VisaStatus.model");
const { Housing } = require('../models/Housing.model');

// utils
const { generateUsers } = require('./seedUtils/User.seed');
const { generateApplication } = require('./seedUtils/Application.seed');
const { generateVisaStatus } = require('../config/seedUtils/VisaStatus.seed');
const { generateAddress } = require('../utils/generateAddress.utils');



async function run() {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Connected to the DB.");
    
    // db reset - check for existence to avoid "error: ns not found"
    if( await User.collection ) await User.collection.drop();
    if( await Application.collection ) await Application.collection.drop();
    if( await VisaStatus.collection ) await VisaStatus.collection.drop();
    if( await Housing.collection ) await Housing.collection.drop();

    // [top][ USER ] seed function arguments = ( totalUsers=10, numberOfAdmins=3 )
    const userCount = 10, adminCount = 3;
    const userList = await generateUsers(userCount, adminCount);
    for( let i=0; i<userList.length; i++ ) {
      const user = userList[i]
      const newUser = await User.create({...user});
      await newUser.save();
           
      // generate application information for each user
      const appInfo = generateApplication();
      const newApplication = await Application.create({
        ...appInfo, 
        user_id: newUser._id, 
        email: newUser.email
      });

      // generate blank visa status
      const visaInfo = generateVisaStatus();
      const newVisaStatus = await VisaStatus.create({
        ...visaInfo,
        user_id: newUser._id,
        application_id: newApplication._id
      });
      await newVisaStatus.save();

      newApplication.visaStatus = newVisaStatus;
      await newApplication.save();
      console.log({newApplication})
    }
    console.log(`successfully seeded ${userCount} users`);
    // [end][USER]

    //[top][HOUSING]
    let houseCount = 3;
    for( let i=0; i<houseCount; i++ ) {
      const houseAddress = generateAddress();
      const newHouse = await Housing.create({ ...houseAddress, idx: i });
      newHouse.save();
    }
    console.log(`successfuly seeded ${houseCount} housing units`)
    //[end][HOUSING]

  } catch (error) {
    console.log(error)
  } finally {
    // setTimeout because connection was closing faster than it takes for the seed to be created
    setTimeout(() => {mongoose.connection.close() }, 1500 )

  }
}

run().catch(console.dir)
