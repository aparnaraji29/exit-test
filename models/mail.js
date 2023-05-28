const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://aparnaraji2000:Aparna29@cluster0.bswwvwk.mongodb.net/exittest?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('mongodb connected successfully')
})

const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    email: String,
    otp:Number
   }, {
    versionKey: false
   })
   

var user = mongoose.model('user', NewUserSchema);
module.exports = user;