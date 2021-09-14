import Message  from "../models/Message"
export default  {
    allMessages : async () => { 
        return await Message.find({}).lean().exec()
    }
}