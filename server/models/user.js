import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    name:{
        type:String,
        required:[true,'name is required']
    }
})

const user = model('user', userSchema);
export default user;