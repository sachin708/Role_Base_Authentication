
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/role.model");

const auth = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, 'shhhhh', async(err, decoded)=>{
            if(decoded){
                const {userID} = decoded;
                const user = await UserModel.findOne({_id:userID});
                const RequiredRole = user.role
                req.role = RequiredRole;
                next();
            }
              
          });
    } else {
        res.json({msg:"login first"})
    }
}

module.exports = {
    auth
}