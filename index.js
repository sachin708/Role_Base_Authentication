
const express = require("express");
const connection = require("./config/db")
const dotenv = require("dotenv");
const { authroute } = require("./routes/auth.route");
const { UserModel } = require("./models/role.model");
const { auth } = require("./middleware/auth.middleware");
const { access } = require("./middleware/access.middleware");


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use("/auth", authroute)

//route
app.get("/home", (req, res)=>{
    res.json({"msg":"this is the home page"})
 });

 app.get("/about", (req, res)=>{
    res.json({msg:"this is the about page"})
 });

 app.get("/movie", auth,  access("seller", "buyer"), (req, res)=>{
    res.json({msg:"this is the movie page"})
 });

 app.get("./series", (req, res)=>{
    res.json({msg:"this is the series page"})
 });

 app.get("/movie/:id", async(req, res)=>{
    const userID = req.params;
   try{
    let user = await UserModel.find({_id:userID});
    res.json({msg:user})
   } catch(err){
    res.json({err:err.message})
   }
 })

const port = process.env.PORT||3000
app.listen(port, async()=>{
    try{
      await connection;
      console.log(`server is running ${port}`);
      console.log("connecting the DB")
    }catch(err){
        console.log("error occure")
    } 
})