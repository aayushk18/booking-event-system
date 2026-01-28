import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,

    },

    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        requred:true,
 
       
    },
    venue: {
        type: String,
        requred:true,
     
       
    },
    date: {
        type: Date,
        requred:true,
     
       
    },
    available_seats: {
        type: Number,
        requred:true,
 
       
    }
    

},{timestamps:true})
const categorySchema = new mongoose.Schema({

   category_name:{
    type: String,
    requred:true,
    unique:true
   },
   categories:[eventSchema],

    

})



export const Event = mongoose.model("Even", categorySchema)