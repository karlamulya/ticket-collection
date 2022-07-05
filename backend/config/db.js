const mongoose = require('mongoose');

const connectDB = async ()=>{
 
    try{
        const conn = await mongoose.connect(process.env.MANGO_URI)
        console.log(`MangoDB Connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
      console.log(`Error:${error.message}`.red.underline);
      process.exit(1)

    }
}

module.exports = connectDB