const mongoose = require("mongoose")
const Schema= mongoose.Schema;
const subCategorySchema= Schema({

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
        required:true,
    },

    category:
    {
        type: Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },

    taxApplicability:
    {
        type:Boolean,
        required:function ()
        {
            return this.category.taxApplicability
        }
    },

   

    tax:
    {
        type:Number,
      required:function() {
        return this.taxApplicability
    },

    },

    item:
    [
    {
        type:Schema.Types.ObjectId,
        ref:"Item",
    },
],
})

const Subcategory= mongoose.model("Subcategory", subCategorySchema)
module.exports=Subcategory