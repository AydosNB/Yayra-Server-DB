import { activationUserServ, registerUserServ } from "../server/authService.js"

export const registerUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = await registerUserServ(email, password)
        res.cookie("refreshToken", userData?.refreshToken, {httpOnly : true, maxAge : 30*24*60*60*1000})
        res.status(201).json(userData)
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}

export const activationUser = async (req, res, next) => {
    try {
        const activation = await activationUserServ(req.params.id)
        res.redirect("https://www.comfort-cleaning.uz/")
    } catch (error) {
        res.status(500).json({message : `Server error : ${error}`})
    }
}
