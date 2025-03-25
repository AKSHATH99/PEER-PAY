import mongoose, { Document, Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema({
    UserName : {
        type:String , 
        require:true,
    },
    Email : {
        type:String , 
        require:true,
    },
    Password : {
        type:String , 
        require:true,
    },
    Phone : {
        type:String , 
        require:true,
    },
   
    

})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;