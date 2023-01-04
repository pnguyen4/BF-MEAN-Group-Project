const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config(path.join(__dirname, '../.env'));
const { MONGO_URI } = process.env;

console.log(MONGO_URI)
mongoose.connect(MONGO_URI, (error) => {
    if (error) console.log(error);
    else console.log("Connected to DB.");
});

module.exports = mongoose.connection;
