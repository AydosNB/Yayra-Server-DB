import { addCatServ, deleteCatServ, getCatServ, getOneCatServ, updateCatServ } from "../server/categoryService.js"


export const getCetegories = async (req, res) => {
    try {
        const categories = await getCatServ()
        res.json(categories)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}


export const addCategories = async (req, res) => {
    try {
        const categories = await addCatServ(req.body, req.files?.image)
        res.status(201).json(categories)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error.message}`})
    }
}

export const deleteCategories = async (req, res) => {
    try {
        const categories = await deleteCatServ(req.params.id)
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}

export const updateCategories = async (req, res) => {
    try {
        const categories = await updateCatServ(req.params.id, req.body, req.files?.image)
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}

export const getOneCetegories = async (req, res) => {
    try {
        const categories = await getOneCatServ(req.params.id)
        res.json(categories)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}

