const mongoose= require("mongoose");

const connectionstring ="mongodb+srv://DhatrikExpense:VrFBzZooBv3YrlJo@cluster0.tb2ah.mongodb.net/WHITEBOARD?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async() => {
    try {
        await mongoose.connect(connectionstring);
        console.log("Connected to database");
    } catch (error) {
        console.log(`Not connected and error is : ${error}`)
    }
}

module.exports= connectToDB;