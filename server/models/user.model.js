import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[20,"Name must be at most 20 characters long"]
    },email:{
        type:String,
        required:true,
        unique:true
    },
    credits:{
        type:Number,
        default:100
    }

}, {timestamps:true});

const User = mongoose.model("User", userSchema); 

export default User;