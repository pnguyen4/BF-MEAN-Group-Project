const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env'));
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

async function run() {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Connected to the DB.");
  } catch (error) {
    console.log(error)
  } finally {
    mongoose.connection.close();
  }
}

run().catch(console.dir)
