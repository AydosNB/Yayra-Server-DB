import { categoryDTO } from "../dtos/categoryDto.js";
import { categoryModel } from "../models/categoryModel.js";
import { deleteFile, saveFile, updateFile } from "./fileService.js";


export const getCatServ = async () => {
    try {
        const categories = await categoryModel.find()
        return categories
    } catch (error) {
        throw new Error('Kategoriya olishda xatolik: ' + error.message);
    }
}

export const addCatServ = async (categoryData, image) => {
    try {
        const fileName = saveFile(image)
        const categories = await categoryModel.create({ ...categoryData, image: fileName })
        const categoryDto = new categoryDTO(categories)
        return categoryDto
    } catch (error) {
        throw new Error("Kategorya qoshishda xatolik: " + error.message)
    }
}

export const deleteCatServ = async (id) => {
    try {
        const oldFileName = await categoryModel.findById(id)
        await deleteFile(oldFileName.image)
        const categories = await categoryModel.findByIdAndDelete(id)
        return categories
    } catch (error) {
        throw new Error("Kategorya o'chirishda xatolik: " + error.message)
    }
}

export const updateCatServ = async (id, updateData, image="") => {
    try {
        const oldFileName = await categoryModel.findById(id)
        const fileName = await updateFile(image, oldFileName.image)
        const categories = await categoryModel.findByIdAndUpdate(id, { ...updateData, image: fileName }, { new: true })
        return categories
    } catch (error) {
        throw new Error("Kategorya o'zgartirishda xatolik: " + error.message)
    }
}

export const getOneCatServ = async (id) => {
    try {
        const categories = await categoryModel.findById(id)
        return categories
    } catch (error) {
        throw new Error('Bitta category olishda xatolik: ' + error.message);
    }
}

