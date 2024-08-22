const Subcategory= require("../models/subcategory.js")
const mongoose = require("mongoose")
const cloudinary=require("../cloudConfig.js").cloudinary

module.exports.getSubcategories = async(req,res)=>
{

    try {
        let {id}=req.params
        const allSubcategories= await Subcategory.find({category:id})
        res.status(200).send(allSubcategories)
    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports.createsubCategory=async(req, res)=>
    {
        try {
            
            const { name, description, taxApplicability, tax,category  } = req.body;       
             let imageUrl="";
            let imageName="";
            if(req.file)
            {
                const result =await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                imageName = result.public_id;
            }
            const isTaxApplicable = taxApplicability === 'true';
            const newCategory= await Subcategory({
                name,
                description,
                image: { url: imageUrl, filename: imageName },
                category,
                taxApplicability,
                tax: isTaxApplicable ? tax : null,
                
            })
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            console.error("Error in createsubCategory:", error);
            res.status(400).json({ error: error.message });
        }
    }
    
    // module.exports.deleteCategory=async(req,res)=>
    // {
    //     try {
    //         const {id}=req.params
    //         const category =await Category.findByIdAndDelete(id)
    //         if(!category)
    //         {
    //           return  res.status(400).json({message:'Category not found'})
    //         }
    
    //         res.status(200).json({message:"Category Deleted Successfully"})
    //     } catch (error) {
    //         res.status(400).json({error:error.message})
    //     }
    // }

    module.exports.getsubCategorybyId=async(req,res)=>
        {
            try {
                const {id}=req.params
                const subcategory= await Subcategory.findById(id)
               
                res.status(200).json(subcategory)
        
            } catch (error) {
                res.status(400).json({error:error.message})
                console.error(error)
            }
        }

        module.exports.updatesubCategory=async(req,res)=>
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
                    }
                    const update= await Subcategory.findByIdAndUpdate(id, data, {new:true})
            
                    if(!update)
                    {
                        res.status(400).json({error:"Subcategory not found"})
                    }
            
                    res.status(200).json(update)
                } catch (error) {
                    res.status(400).json({error:error.message})
                }
            }