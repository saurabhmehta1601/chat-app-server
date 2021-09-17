import {Schema,model} from "mongoose"

export interface IUser {
    username: string;
    password:string ;
   refreshTokenVersion: number; 
}

const UserSchema =  new Schema<IUser>({
    username: {
        type:String,
        required:true,
        unique: true,
        minlength: 8,
        maxlength: 32
    },
    password:{
        type:String,
        required:true,
    },
    refreshTokenVersion:{
        type:Number,
        default:0,
        required:true 
    }
},{timestamps: true})

export default model<IUser>('User',UserSchema)