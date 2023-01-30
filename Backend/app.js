require("dotenv").config();
require("./config/database").connect();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const express = require("express");
const app = express();
const User = require('../Backend/models/user');
const Department = require('../Backend/models/department');
const Employee = require('../Backend/models/employee');

app.use(express.json());


app.get('/department', function (req, res, next) {
	return res.send('helllo');
    let department  = Department.find({name:req.body})
    res.send(department)
});

app.post("/register", async (req, res) => {
    try {
      const {  email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send("All input is required");
      }
      
      const oldUser =await User.findOne({email})
      console.log(oldUser)
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );
      user.token = token;
  
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    return res.send('internal error')
  });
  



  app.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
  
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });


module.exports = app;