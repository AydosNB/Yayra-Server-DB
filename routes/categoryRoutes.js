import express from "express"
import { addCategories, deleteCategories, getCetegories, getOneCetegories, updateCategories } from "../controllers/categoryController.js"
import { validateCategoryData } from "../middlewares/validateCategoryData.js"

const router = express.Router()

router.get("/get", getCetegories)
router.post("/add", validateCategoryData, addCategories)
router.put("/update/:id", updateCategories)
router.delete("/delete/:id", deleteCategories)
router.get("/get-one/:id", getOneCetegories)


export const categoryRouter = router