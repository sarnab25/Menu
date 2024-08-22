const express=require("express")
const router= express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const subCategorycontoller=require("../controllers/subcategory.js")

router.get('/:id/subcategories',subCategorycontoller.getSubcategories)
router.post("/subcategory/create",upload.single('image'),subCategorycontoller.createsubCategory)
router.get('/subcategory/:id', subCategorycontoller.getsubCategorybyId)
router.put('/subcategory/:id/edit', upload.single('image'),subCategorycontoller.updatesubCategory)
module.exports=router