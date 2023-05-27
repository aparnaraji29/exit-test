const express = require ('express')
const cors = require('cors')


var nodemailer = require('nodemailer');

const PORT = 8000;

const app = express()

const user = require('./models/mail')
require('./middlewares/mongoDB') //init mongodb

app.use(cors({
    credentials:true,
    origin: ['http://localhost:4200']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  
function sendotp(email){


    // store data
    const newUser = new user({
        email: email,
        otp: otp
      });
  
      // Save the user document to the database
    newUser.save();

  
    let mailTransporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'aparnaraji2000@gmail.com',
            pass:'vuerbcmndgntkbln'
        }
    })

    let details = mailTransporter.sendMail({
        from:'aparnaraji2000@gmail.com', //enter your currect email
        to: email, //.....dont change.....
        subject:'Otp Verification', //enter your subject
        html: `Your OTP is: ${otp}` //enter your email
    });
}

 async function verifyOTP(email, otp) {

    const users = await user.findOne({ email }).exec();

    console.log(users);
  
    if (users.email === email && users.otp ===otp) {
       users.isLoggedIn = true;
      await users.save();
  
      console.log('success');
    } else {
      console.log('error');
    }
  
  }

app.post('/send-otp', async (req, res) => {
    // Get the email address from the request
    let email = req.body.email
  
    // Send the OTP to the user's email address
    await sendotp(email);
    res.json({status:'success'})
    console.log(otp);

    

    
    
  
    // Redirect the user to the OTP verification page
    // res.redirect('/verify-otp');
  });

//   verify password
app.post('/verify-otp', async (req, res) => {
    // Get the email address and OTP from the request
    let email = req.body.email

    console.log(email);
    console.log(otp);

    // const email = user.findOne(emails);
    // const otp = user.findOne(emails);
  
    // Verify the OTP
    
    
    await verifyOTP(email, otp);
  
    // Redirect the user to the home page
    // res.redirect('/');
    res.json({status:"1"})
  });





app.listen(PORT, ()=>{
    console.log(`...........server started at port ${PORT}.........`)
})