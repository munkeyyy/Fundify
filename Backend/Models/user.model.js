import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({

    user_name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },

    phone:{
        type:Number,
        default:null
    },

    avatar:{
        type:String,
        default:null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin',
    }

   
    
},{timestamps:true})

UserSchema.methods.isAdmin = function() {
    return this.role === 'admin';
};


export default mongoose.model("user", UserSchema)