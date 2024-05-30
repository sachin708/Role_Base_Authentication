
const mongoose = require("mongoose");

const userScheam = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require: true, unique:true},
    pass:{type:String, require:true},
    role:{type:String, enum:["customer", "seller", "buyer"], default:"customer"}
}, {
    versionKey:false
});

const UserModel = mongoose.model("user", userScheam);

module.exports = {
    UserModel
}