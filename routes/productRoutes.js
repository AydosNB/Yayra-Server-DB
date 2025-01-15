import express from "express";
import { addProduct, deleteProducts, getOneProducts, getProducts, updateProducts } from "../controllers/productController.js";
import { validateProductData } from "../middlewares/validateProductData.js";

const router = express.Router()

router.get("/get", getProducts)
router.post("/add", validateProductData, addProduct)
router.put("/update/:id", updateProducts)
router.delete("/delete/:id", deleteProducts)
router.get("/get-one/:id", getOneProducts)



export const productRouter = router