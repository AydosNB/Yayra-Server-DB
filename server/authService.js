import { userDTO} from "../dtos/userDTO.js"
import { userModel } from "../models/userModel.js"
import bcrypt from "bcrypt"
import { generateTokenServ,  saveTokenServ } from "./tokenService.js"
import sendActicvationMail from "./mailService.js"


export const registerUserServ = async (email, password) => {
    try {
        const existUser = await userModel.findOne({email})

        if(existUser) {
            throw new Error(`User with existing email ${email} already registered`)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password : hashPassword})
        const userDto = new userDTO(user)
        
        
        const activatedLink = `${process.env.API_URL}/api/auth/activation/${userDto.id}`
        console.log(activatedLink)
        const tokens = generateTokenServ({...userDto})
        await saveTokenServ(userDto.id, tokens.refreshToken)
        await sendActicvationMail(email, activatedLink)
        return {user : userDto, ...tokens}
    } catch (error) {
        console.warn(error)
    }
}

export const activationUserServ = async (userId) => {
    const user = await userModel.findById(userId)

    if(!user) {
        throw new Error("User is not defined")
    }

    user.isActivated = true
    await user.save()
}