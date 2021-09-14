import mongoose from 'mongoose'

export interface IMessage {
    author:string,
    content:string
}

const MessageSchema = new  mongoose.Schema<IMessage>({
    author:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    } ,
},{timestamps: true})

export default mongoose.model<IMessage>('Message', MessageSchema)