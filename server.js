import express, { json } from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/db.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import fileUpload from "express-fileupload";


dotenv.config()
connectMongoDB()

const app = express()
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static("static"))


app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)


app.get("/", (req, res) => {
    res.send("Salom dunyo")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running : http://localhost:${PORT}`))





