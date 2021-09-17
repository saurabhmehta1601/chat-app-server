import express from "express"
import cookieParser from "cookie-parser"
import {ApolloServer} from "apollo-server-express";
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
    },
    context: ({req,res}) => ({req,res})
})

const app = express()

app.use(cookieParser())


server.applyMiddleware({app})

connectDb()
.then(() => {
    console.log("🤜  mongoose connected to mongoDB ~~ ")
    app.listen({port: 4000} ,() =>{ 
        console.log(`🚀  Running graphql server on ${server.graphqlPath}`)
    })
})
.catch((err: any )=> {
    console.log("⚠️  mongoose connection failed !! ")
    console.log(err)
})