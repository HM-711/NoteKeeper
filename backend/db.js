const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection to mongo successful");
    })
}

module.exports = connectToMongo;