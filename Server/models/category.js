const mongoose = require("mongoose")
const Schema=mongoose.Schema
const categorySchema = Schema({

    name:
    {
        type:String,
        required:true,
    },

    image:
    {
       url:String,
       filename:String,
    },

    description:
    {
        type:String,
        requires:true,
    },

    taxApplicability:
    {
        type:Boolean,
        required:true,
    },

    tax:
    {
        type:Number,
        required: function ()
        {
            return this.taxApplicability
        },
    },

    taxType:
    {
        type:String,
        enum:["Percentage", "Flat", "Excise", "Service"],
        required:function ()
        {
            return this.taxApplicability
        },
    },

    
})

const Category = mongoose.model("Category", categorySchema)
module.exports=Category