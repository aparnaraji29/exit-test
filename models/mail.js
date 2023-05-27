const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailSchema = new Schema ({
    email:{
        type:String,
        required:true
    },
    isLoggedIn: {
         type: Boolean,
          default: false
         },
    otp:{
        type: String 
    }
})
    
let mailDATA = mongoose.model('maildetails',mailSchema)

module.exports = mailDATA