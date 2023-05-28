const express = require('express');
const cors = require('cors');
const path=require('path');
const user = require('./models/mail');
const nodemailer = require('nodemailer');

const app=express();
app.use(cors());
app.use(express.json({urlencoded:true}));

app.use(express.static('./dist/frontend'));


app.post('/api/emailsend',(req,res)=>{
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
          user: 'aparnaraji2000@gmail.com',
          pass: 'vuerbcmndgntkbln'
      }
   });
   
   var mailOptions = {
      from: 'aparnaraji2000@gmail.com',
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
  res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
 });


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})