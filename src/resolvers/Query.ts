import Message  from "../models/Message"
export default  {
    getMessages: async () => { 
        return await Message.find({}).lean().exec()
    }
}