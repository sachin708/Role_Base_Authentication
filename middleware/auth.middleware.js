
const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, 'shhhhh', function(err, decoded) {
              next();
          });
    } else {
        res.json({msg:"login first"})
    }
}

module.exports = {
    auth
}