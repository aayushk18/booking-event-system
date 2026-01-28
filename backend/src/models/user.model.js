import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    authUser: {
        type: String,
        requred:true,
        default: 'user'
       
    }

})

export const User = mongoose.model("User", userSchema)