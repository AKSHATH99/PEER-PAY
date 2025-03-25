import mongoose, { Document, Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema({
    UserName : {
        type:String , 
        require:true,
    }
})