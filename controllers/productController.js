import { deleteCatServ, updateCatServ } from "../server/categoryService.js"
import {addProServ, deleteProServ, getOneProServ, getProServ, updateProServ } from "../server/productService.js"

export const getProducts = async (req, res) => {
    try {
        const products = await getProServ()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: `Server error : ${error.message}` })
    }
}

export const addProduct = async (req, res) => {
    try {
        const products = await addProServ(req.body, req.files?.images)
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: `Server error : ${error.message}` })
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const products = await deleteProServ(req.params.id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error.message}`})
    }
}

export const updateProducts = async (req, res) => {
    try {
        const products = await updateProServ(req.params.id, req.body, req.files?.images)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error.message}`})
    }
}

export const getOneProducts = async (req, res) => {
    try {
        const products = await getOneProServ(req.params.id)
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: `Server error : ${error.message}` })
    }
}