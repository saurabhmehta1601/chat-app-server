import {compare, hash} from "bcryptjs"
import { sign } from "jsonwebtoken"
import Message, { IMessage } from "../models/Message"
import User,{IUser} from "../models/User"

export default  {
    register: async (_parent: any, {username,password} : IUser) =>{ 
        password = await hash(password,10) 
        const user = await User.create({username,password})
        return user 
    },
    login: async (_parent: any, {username,password} : IUser) =>{ 
        const user = await User.findOne({username})
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isValid = await compare(password , user.password)
        if(!isValid){
            throw new Error("Invalid password")
        }
        return {
            accessToken: sign({userId:user.id},"SUPERSECRET",{
            expiresIn:'15m',
            }) 
        }
    },
    createMessage: async (parent : any , {content,author} : IMessage) => { 
        return await Message.create({content,author})
    }

}