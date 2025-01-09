import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type :String,
        required :true,
    },
    email: {
        type : String,
        require: true,
        unique: true,
    },
    password:{
        type:String, 
        required:true,
    },
    token : {
        type:String
    }
})

const userModel =  mongoose.model("User", userSchema);

export default userModel;