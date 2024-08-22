const express=require("express")
const router= express.Router()
const itemController =require("../controllers/item.js")
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.get("/:id/items", itemController.getallItem)
router.post("/create/item",upload.single('image'),itemController.createItem)
router.get("/item/:id", itemController.getItembyID)
router.put("/item/:id",upload.single('image'),itemController.updateItem)
router.get("/item/:search", itemController.search)
module.exports=router