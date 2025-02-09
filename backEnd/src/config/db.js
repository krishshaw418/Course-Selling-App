const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbconnection = async()=>{
    try {
        const mongo = await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME});
        if(mongo){
            console.log(`Database connected`);   
        }else{
            console.log(`Database not connected`);
        }
    } catch (error) {
        console.error(`Database Connection Error:`,error);
    }
};

module.exports = dbconnection; 