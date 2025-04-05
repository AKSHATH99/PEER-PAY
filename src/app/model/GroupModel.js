import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    admin_razorpay_merchant_id:{
        type:String,
    },
    memeber:{

    },
    total_amount :{
        type:Number,
        default:0,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    members:[{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        total_contribution: {
            type: Number,
            default: 0
        },
        amount_remaining: {
            type: Number,
            default: 0
        }
    }]
    
    
})

const Group =   mongoose.models.Group || mongoose.model("Group",GroupSchema);

export default Group;
