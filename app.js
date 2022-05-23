// Make sure you have enabled lass secure app access in Gmail
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
var nodemailer=require("nodemailer");
//app.use(express.static("public"));
app.use(express.static(__dirname));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
  res.render("index");
});

let transporter=nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service:'gmail',
  auth:{ user:"Your mail" , pass:"Your password"}
});
// Instead of writing your mail and passwoed here, its better to write it in .env file as EMAIL="your email" similarly for your password write in in same .env file and here write user:process.env.EMAIL  pass:process.env.PASSWORD
var mailOptions={
  from:'Your mail (same as mentioned above)',
  to:'',
  subject:' Student Registration',
  text:''
};

app.post("/", function(req, res) {

  mailOptions.to=req.body.username;
  mailOptions.text="Hi "+ req.body.studentname+ ", " + "you have been registered and " + "you will be contacted soon.";
  transporter.sendMail(mailOptions,function(err){
  if(err)
  {
    console.log(err);
  }
  else
  {
    res.render("index2");
  }
});
});



app.listen(3000 || process.env.PORT, function() {
  console.log("Server is up and running");
});
