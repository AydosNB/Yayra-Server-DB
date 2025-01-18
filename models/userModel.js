import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, reuired : true},
    isActivated : {type : Boolean, default: false}
}, {timestamps : true})

export const userModel = model("User", UserSchema)