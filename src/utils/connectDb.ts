import  mongoose  from "mongoose";

const connectDb = () => {
    if(!process.env.MONGO_URI){
        console.log(" ⚠️ Mongo URI fetched from .env is undefined !!")
        process.exit(1)
    }else{
        return mongoose.connect(process.env.MONGO_URI)
    }
}
export default connectDb