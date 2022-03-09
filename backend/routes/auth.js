const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "@JokeristheBestCharacterin$DC$Universe";

// ROUTE-1: Create a user using: POST "/api/auth/createUser". No login required

router.post(
  "/createUser",
  [
    body("name","Name cannot be empty").exists(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    // Checking for errors and returning them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Creating a new user
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user already exists with the given email" });
      }

      //Generating secure password using hashing
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      // .then(user => res.json(user)).catch(err=>{res.json({error: 'Please enter a unique value for email', message: err.message})})
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      // res.json(user);
      success = true;
      res.json({success, authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE-2: Authenticate a user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // Checking for errors and returning them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success, error:"Kindly login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({ success, error: "Kindly login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  } 
);

// ROUTE-3: Obtain LoggedIn user details using: POST "/api/auth/getUser". Login required

router.post("/getUser",fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});


module.exports = router;