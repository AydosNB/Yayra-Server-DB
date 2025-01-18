import jwt from "jsonwebtoken"
import { tokenModel } from "../models/tokenModel.js"

export const generateTokenServ = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn : "15m"})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn : "30d"})

    return {accessToken, refreshToken}
}

export const saveTokenServ = async (userId, refreshToken) => {
    const existToken = await tokenModel.findOne({user : userId})
    if(existToken) {
        existToken.refreshToken = refreshToken
        return existToken.save()
    }

    const token = await tokenModel.create({user : userId, refreshToken})
    return token
}