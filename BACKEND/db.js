const mongoose= require("mongoose");
require('dotenv').config();


const connectionstring =process.env.MONGO_URI;

const connectToDB = async() => {
    try {
        await mongoose.connect(connectionstring);
        console.log("Connected to database");
    } catch (error) {
        console.log(`Not connected and error is : ${error}`)
    }
}

module.exports= connectToDB;