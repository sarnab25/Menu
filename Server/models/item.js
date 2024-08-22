const mongoose= require("mongoose")
const Schema = mongoose.Schema
const itemSchema = new Schema({
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

    baseAmount:
    {
        type:Number,
        required:true,
    },

    discount:
    {
        type:Number,
        required:true,
    },

    totalAmount:
    {
        type:Number,
        required:true,
        min:0,
        default:function()
        {
            return this.baseAmount-this.discount;
        },

    },
})

const Item = mongoose.model("Item", itemSchema)
module.exports=Item