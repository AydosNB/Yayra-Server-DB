import mongoose, { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    images: { type: [String], required: true, validate : [(val) => val.length>0, "At last one image is required"] },
    description: { type: String, required: true },
    price: { type: Number, min : 0,  required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref : "Category" },
})

export const productModel = model("Product", productSchema)