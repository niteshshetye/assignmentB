// mongoose
const mongoose = require('mongoose');
const establishConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL)
        console.log('Connected With Mongoose');
    }catch(error){
        console.log(error)
    }
}

module.exports = {establishConnection}