
 const express = require("express");

 const authroute = express.Router();

 authroute.get("/home", (req, res)=>{
    res.json({"msg":"this is the home page"})
 });

 module.exports = {
    authroute
 }