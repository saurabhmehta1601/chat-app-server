import {sign,verify} from "jsonwebtoken"
import { IUser } from "../models/User"

export const createAccessToken = (user: IUser) => {
    return sign({userId:user.id},process.env.JWT_ACCESS_TOKEN_SECRET!,{
        expiresIn:'15m',
    })
}

export const createRefreshToken = (user: IUser) => {
    return sign({userId:user.id,version: user.refreshTokenVersion},process.env.JWT_REFRESH_TOKEN_SECRET!,{
        expiresIn:'7d',
    })
}

export const decodeAccessToken : any = (token: string) => {
    return verify(token,process.env.JWT_ACCESS_TOKEN_SECRET!)
}

export const decodeRefreshToken : any = (token: string) => {
    return verify(token,process.env.JWT_REFRESH_TOKEN_SECRET!)
}
