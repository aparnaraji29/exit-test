const express = require('express');
const cors = require('cors');
const path=require('path');
const user = require('./models/mail');
const nodemailer = require('nodemailer');
// const exphbs=require('express-handlebars');

const app=express();
app.use(cors());
app.use(express.json({urlencoded:true}));

app.use(express.static('./dist/front-end'));


app.post('/api/email',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE")
    const randomPin = Math.floor(1000 + Math.random() * 9000);
    var data ={
     email : req.body.email,
     otp:randomPin
    }
    var authdb = new user(data)
    authdb.save().then((data)=>{
   
     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'devarajpraj369@gmail.com',
          pass: 'odbxowidllayrlmg'
      }
   });
   
   var mailOptions = {
      from: 'devarajpraj369@gmail.com',
      to: data.email,
      subject: 'OTP',
      text: `OTP is ${data.otp}`
   
   };

   transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    } else {
        console.log('email send:'+info.response);
    }
 });
   
   console.log(data)
  res.send(data)
  }
   )
 
 })
 
 app.post('/api/otp',(req,res)=>{
   var data = {
     email:req.body.email,
     otp:req.body.otp
 }
 user.findOne({email:data.email,otp:data.otp}).then((data)=>{
  if (data != null ){
   console.log("otp verify",data)
   res.send(data)
  }
  else{
 res.send(null)
  }
  
 })
 })

  app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/front-end/index.html'));
 });


const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})