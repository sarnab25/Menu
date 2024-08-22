const express = require("express")
const mongoose = require("mongoose")
const path =require("path")
const dotenv= require("dotenv")
const Item = require("./models/item.js")
const Category= require("./models/category.js")
const Subcategory= require("./models/subcategory.js")
const cors= require("cors")
const categoryRouter =require("./routes/category.js")
const subCategoryRouter=require("./routes/subcategory.js")
const itemRouter =require("./routes/item.js")
const bodyParser=require("body-parser")
const app= express()
dotenv.config()

const dbURL=process.env.ATLAS_URL

main().then(()=>
{
    console.log("Connected to databse")
}).catch((err)=>
{
    console.log(err)
})
app.listen(5050, ()=>
{
    console.log("Server listening on 5050")
})
async function main()
{
    await mongoose.connect(dbURL)

}

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use("/categories",categoryRouter )
app.use("/category", subCategoryRouter)
app.use("/subcategory", itemRouter)

// async function addCategory()
// {




// }

// async function addItem ()
// {
//     let item1 = new Item ({
//         name:"Paneer Tikka",
//         image:
//         {
//             url:"",
//             filename:"Photo",
//         },
//         description:"Very Delicious",
//         taxApplicability:true,
//         tax:445454545,
//         baseAmount:100,
//         discount:25,
      
//     })


//     let item2 = new Item ({
//         name:"Daal",
//         image:
//         {
//             url:"",
//             filename:"Photo",
//         },
//         description:"Very Delicious",
//         taxApplicability:true,
//         tax:445454545,
//         baseAmount:120,
//         discount:25,
        
//     })


//     let category1 = new Category({
//         name:"Appetizers",
//         image:{
//             url:"",
//             filename:"photo"
//         },
//         description:"It is good way to start",
//         taxApplicability:true,
//         tax:44887878,
//         taxType:"Service",
        
//     })
    
//     await category1.save();


//     let subCategory1= new Subcategory({
//         name:"Vegetarian",
//         image:{
//             url:"",
//             filename:"photo"
//         },
//         description:"It is good way to start",
//         category:category1._id,
//         taxApplicability:category1.taxApplicability,
//         tax:category1.tax,
//         item:[
//             item1._id , item2._id
//         ]
        
//     })

//     let subCategory2= new Subcategory({
//         name:"Non-Vegetarian",
//         image:{
//             url:"",
//             filename:"photo"
//         },
//         description:"It is good way to start",
//         category:category1._id,
//         taxApplicability:category1.taxApplicability,
//         tax:category1.tax,
        
//     })

//     await subCategory1.save()
//     await subCategory2.save()



// }

// addItem();