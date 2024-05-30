const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { UserModel } = require("../models/role.model");

const authroute = express.Router();



authroute.post("/register", (req, res)=>{
    const {name, email, pass, role} = req.body;

    try{
        bcrypt.hash(pass, 4, async(err, hash)=> {
           if(err){
            res.json({err:err.message})
           } else {
            let user = new UserModel({
                name, 
                email,
                pass:hash,
                role
               });
               await user.save();
               res.json({"msg":"new user is register"})
           }
        });
    }catch(err){
        res.json({"msg":err.message})
    }
});

authroute.post("/login", async(req, res)=>{
    const{email, pass} = req.body;
    try{
      const user = await UserModel.findOne({email});
      if(user){
        bcrypt.compare(pass, user.pass, function(err, result) {
           if(result){
            res.json({msg:"user is login", "token" : jwt.sign({ foo: 'bar' }, 'shhhhh')})
           } else {
            res.json({msg:"wrong password"})
           }
        });
      } else {
        res.json({msg:"wrong credential"})
      }
    }catch(err){
        res.json({err:err.message})
    }
})
module.exports = {
   authroute
}