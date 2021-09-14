import Message, { IMessage } from "../models/Message"
export default  {
    createMessage: async (parent : any , {content,author} : IMessage) => { 
        return await Message.create({content,author})
    }
}
