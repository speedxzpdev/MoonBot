const mongoose = require("mongoose");
require("dotenv").config();


async function connectMongo() {
await mongoose.connect(process.env.URI_DB);

  
}

module.exports = connectMongo