
const access = (...permittedrole)=>{
    return (req, res, next)=>{
        if(permittedrole.includes(req.role)){
            next();
        } else {
            res.json({msg:"You are not access"})
        }
    }
}

module.exports = {
    access
}