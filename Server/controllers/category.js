const Category = require("../models/category.js")
const mongoose = require("mongoose")
const cloudinary=require("../cloudConfig.js").cloudinary

module.exports. getCategories =async(req, res)=>
{
    try {
        const allCategories = await Category.find({})
        res.status(200).send(allCategories)
    } catch (error) {
        res.status(400).json(error)
    }
}



module.exports.createCategory=async(req, res)=>
{
    try {
        
        const { name, description, taxApplicability, tax, taxType } = req.body;       
         let imageUrl="";
        let imageName="";
        if(req.file)
        {
            const result =await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            imageName = result.public_id;
        }
        const isTaxApplicable = taxApplicability === 'true';
        const newCategory= await Category({
            name,
            description,
            image: { url: imageUrl, filename: imageName },
            taxApplicability,
            tax: isTaxApplicable ? tax : null,
            taxType: taxApplicability ? taxType : null
        })
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports.deleteCategory=async(req,res)=>
{
    try {
        const {id}=req.params
        const category =await Category.findByIdAndDelete(id)
        if(!category)
        {
          return  res.status(400).json({message:'Category not found'})
        }

        res.status(200).json({message:"Category Deleted Successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports.getCategorybyId=async(req,res)=>
{
    try {
        const {id}=req.params
        const category= await Category.findById(id)
       
        res.status(200).send(category)

    } catch (error) {
        res.status(400).json({error:error.message})
        console.error(error)
    }
}

module.exports.updateCategory=async(req,res)=>
{
    try {
        const data = req.body;    
        const {id}=req.params   
       
        if(req.file)
        {
            const result =await cloudinary.uploader.upload(req.file.path);
           data.image= 
           { url: result.secure_url, 
            filename: result.public_id }
        }
        const isTaxApplicable = data.taxApplicability === 'true';
        if (isTaxApplicable) {
            data.tax = parseFloat(data.tax); // Convert tax to a number
            taxType:data.taxType
        } else {
            data.tax = 0; // Set tax to 0 if not applicable
            data.taxType = ''; // Clear taxType if not applicable
        }
        const update= await Category.findByIdAndUpdate(id, data, {new:true})

        if(!update)
        {
            res.status(400).json({error:"Category not found"})
        }

        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}