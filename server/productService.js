import { productDTO } from "../dtos/productDto.js";
import { productModel } from "../models/productModel.js";
import { deleteFile, saveFile, updateFileArray } from "./fileService.js";


export const getProServ = async () => {
    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        throw new Error('Product olishda xatolik: ' + error.message);
    }
}

export const addProServ = async (productData, images = []) => {
    try {
        const fileImagesName = () => {
            if (images.length > 0) {
                return images.map((item) => saveFile(item))
            } else if (images.length === 0) {
                return images
            } else {
                return [images].map((item) => saveFile(item))
            }
        }
        const products = await productModel.create({ ...productData, images: fileImagesName() })
        const productDto = new productDTO(products)
        return productDto
    } catch (error) {
        throw new Error("Product qoshishda xatolik: " + error.message)
    }
}

export const deleteProServ = async (id) => {
    try {
        const oldFileName = await productModel.findById(id)
        await deleteFile(oldFileName.images)
        const products = await productModel.findByIdAndDelete(id)
        return products
    } catch (error) {
        throw new Error("Product o'chirishda xatolik: " + error.message);
    }
}

export const updateProServ = async (id, updateData, images = []) => {

    try {
        const oldFileName = await productModel.findById(id)
        const newFileNames = await updateFileArray(images, oldFileName?.images)
        const products = await productModel.findByIdAndUpdate(id, { ...updateData, images: images ? newFileNames : oldFileName.images }, { new: true })
        return products
    } catch (error) {
        throw new Error("Product o'zgartirishda xatolik: " + error.message);
    }
}

export const getOneProServ = async (id) => {
    try {
        const products = await productModel.findById(id)
        return products
    } catch (error) {
        throw new Error('Bitta product olishda xatolik: ' + error.message);
    }
}