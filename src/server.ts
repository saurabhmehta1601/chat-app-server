import {ApolloServer} from "apollo-server";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation"
import typeDefs from "./Schema"
import connectDb from "./utils/connectDb"
import {config} from "dotenv"
config()

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query, Mutation
    }
})

connectDb().then(() => {
    console.log("🤜  mongoose connected to mongoDB ~~ ")
    server.listen()
    .then(({url})   => {
        console.log(`🚀  Running graphql server on ${url}`)})
    .catch(() => { console.log("⚠️  Server failed to start !! ")})
})
.catch((err: any )=> {
    console.log("⚠️  mongoose connection failed !! ")
    console.log(err)
})