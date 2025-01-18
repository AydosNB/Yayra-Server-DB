import { Schema, model } from "mongoose"

const CategorySchema = new Schema({
     name: { type: String, required: true },
     image: { type: String, required: true },
     description: { type: String, required: true },
})

export const categoryModel = model("Category", CategorySchema)