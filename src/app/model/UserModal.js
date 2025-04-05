import mongoose, { Document, Schema, Types } from "mongoose";


const userSchema = new Schema({
    Name: {
        type:String,
        required:true,
    },
    UserName : {
        type: String, 
        required: true,
        unique: true,
    },
    Email : {
        type: String, 
        required: true,
        unique: true,
    },
    Password : {
        type: String, 
        required: true,
    },
    Phone : {
        type: String, 
        required: true,
    },
    isAdmin : {
        type: Boolean, 
        required: true,
        default: false,
    },
    Groups:{
        type: Schema.Types.ObjectId,
        ref:"Group",
    },
    merchant_id:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;