const express = require("express")
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const categoryContoller= require("../controllers/category.js")

router.get("/get", categoryContoller.getCategories)
router.post("/create",upload.single('image'),categoryContoller.createCategory)
router.delete("/:id/delete", categoryContoller.deleteCategory)
router.get('/:id', categoryContoller.getCategorybyId)
router.put("/:id/edit", upload.single('image'),categoryContoller.updateCategory)
module.exports=router