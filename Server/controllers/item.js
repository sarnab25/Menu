const mongoose =  require("mongoose")
const Subcategory= require("../models/subcategory.js")
const Item= require("../models/item.js")
const cloudinary=require("../cloudConfig.js").cloudinary
module.exports. getallItem =async(req, res)=>
{
    try {
        const {id}=req.params
        const subcategory =await Subcategory.findById(id)
        const allItems =await  Item.find({ _id: { $in: subcategory.item } });
        res.status(200).send(allItems)
    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports.createItem=async(req,res)=>
{
    try {
     
const subCategory=req.body.subcategory
const subcategory =await Subcategory.findById(subCategory)
if(!subCategory)
{
    return res.status(400).json({error:"Subcategory not found"})
}

        const { name, description, taxApplicability, baseAmount,discount } = req.body;       
         let imageUrl="";
        let imageName="";
        if(req.file)
        {
            const result =await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            imageName = result.public_id;
        }
        const isTaxApplicable = taxApplicability === 'true';
        const taxValue = isTaxApplicable ? req.body.tax : 0;

        const newItem= await Item({
            name,
            description,
            image: { url: imageUrl, filename: imageName },
            taxApplicability: isTaxApplicable,          
             tax: taxValue,
            baseAmount,
            discount,
        })
     const savedItem=   await newItem.save();
     subcategory.item.push(savedItem._id)
     await subcategory.save()

     res.status(200).json(savedItem);

    } catch (error) {
        res.status(400).json({ error: error.message });

        console.error(error)
    }
}

module.exports.getItembyID =async(req,res)=>
{
    try {
        const {id}=req.params
        const item= await Item.findById(id)
res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error:error.message})
        console.error(error)
    }
}

module.exports.updateItem=async(req,res)=>
{
    try {
        const data=req.body
        const {id}=req.params
        if(req.file)
            {
                const result =await cloudinary.uploader.upload(req.file.path);
               data.image= 
               { url: result.secure_url, 
                filename: result.public_id }
            }

            const update= await Item.findByIdAndUpdate(id, data, {new:true})
            console.log(update)
            if(!update)
            {
                res.status(400).json({error:"Item not found"})
            }
    
            res.status(200).json(update)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports.search=async(req, res)=>
{
    try {
        const {name} =req.params
        const item =await Item.findOne({name:new RegExp(name, 'i')})
        res.status(200).json(item)
        console.log(item)
    } catch (error) {
        res.status(500).json({ message: 'Error searching items' });
        console.error(error)
    }
}