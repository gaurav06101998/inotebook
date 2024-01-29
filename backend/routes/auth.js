const express = require('express');
const router = express.Router();
const User =require('../models/User')
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const SECERT_SIGN='hellothere'
//  Routes:1 Endpoint localhost:5000/api/auth/createuser  no  login required
router.post('/createuser',[
    body('name','Name is invalid').isLength({min: 3}),
    body('email','Email is invalid').isEmail(),
    body('password','Password is invalid').isLength({min: 5}),
], async (req,res)=>{
    //checking if there result is empty  or no.
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success =false;
      return res.status(400).json({success,errors: errors.array()});
    }
    //creating user & checkig is email unique or not!!!
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
             success =false;
            return res.status(400).json({success,error: 'Sorry email already exit'})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);


        user= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data ={
           user:{
            id: user.id
           }
        }
        const jwtAuth = jwt.sign(data,SECERT_SIGN)
        success =true;
        res.json({success,jwtAuth}) 
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error is occured"})
    }
   
})

//Authentication Endpoint localhost:5000/api/auth/login  no login required
router.post('/login',[
    body('email','Email is invalid').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{
    let success =false;
    //checking if there result is empty  or no.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success =false;
        return res.status(400).json({success,errors: errors.array()});
    }
    // checkig is email unique or not!!!   login required
    const {email,password} =  req.body;
 
    try {
        let user = await User.findOne({email});
        if(!user){
            success =false;
            return res.status(400).json({success,error: 'Please Enter a valid credentials'})
        }

     const passwordCompared =bcrypt.compare(password, user.password);
     console.log(passwordCompared)
     if(!passwordCompared){
        success =false;
        return res.status(400).json({success,error: 'Please Enter a valid credentials'})
     }
      
     const data ={
        user:{
         id: user.id
        }
     }
        const jwtAuth = jwt.sign(data,SECERT_SIGN)
        success = true;
        res.json({success,jwtAuth}) 
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }

    
})
// verify user and get user detail localhost:5000/api/auth/getuser login required

router.post('/getuser',fetchuser, async (req,res)=>{
try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user)

} catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"})
}
})

module.exports = router