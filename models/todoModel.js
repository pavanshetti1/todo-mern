import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text : {
        type : String, 
        required: true,
    },
    completed : {
        type : Boolean,
        default:false,
    },
    createdAt: {
        type:Date,
        default : Date.now
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const todoModel =  mongoose.model("Todo", todoSchema);    
export default todoModel;