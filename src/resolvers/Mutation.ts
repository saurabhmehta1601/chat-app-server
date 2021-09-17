import {Response} from "express"
import {compare, hash} from "bcryptjs"
import { sign } from "jsonwebtoken"
import Message, { IMessage } from "../models/Message"
import User,{IUser} from "../models/User"
import jwt from "jsonwebtoken"
import { createAccessToken, createRefreshToken, decodeRefreshToken } from "../utils/jwt"

export default  {
    register: async (_parent: any, {username,password} : IUser) =>{ 
        try{
            password = await hash(password,10) 
            const user = await User.create({username,password})
            return user 
        }catch(err){
            throw new Error("User cannot be created")
        }
    },
    login: async (_parent: any, {username,password} : IUser,{res} : {res:Response} ) =>{ 
        try{
            const user = await User.findOne({username})
            if(!user){
                throw new Error("Invalid credentials")
            }
            const isValid = await compare(password , user.password)
            if(!isValid){
                throw new Error("Invalid password")
            }
            res.cookie('rtk',createRefreshToken(user), { httpOnly:true } )
            return {
                accessToken: createAccessToken(user) 
            }
        }catch(err){
            throw new Error("User login unsuccessful")
        }
    },
    refreshToken: async (parent:any,args:any,{req,res} : any) => {
        try{
            const {userId}= decodeRefreshToken(req.cookies['rtk'])
            const user = await User.findOne({id:userId}).lean().exec()
            if(!user){
                throw new Error("Invalid token")
            }
            res.cookie('rtk',createRefreshToken(user),{httpOnly:true})
            return { accessToken: createAccessToken(user) }
        }
        catch(err){
           return { 
               error:{
                   message:"Please login"
               }
           } 
        }
    },
    createMessage: async (parent : any , {content,author} : IMessage) => { 
        return await Message.create({content,author})
    }
}