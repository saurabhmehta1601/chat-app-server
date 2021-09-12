import {ApolloServer} from "apollo-server";
import Query from "./resolvers/Query";
import typeDefs from "./Schema"


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query
    }
})

server.listen().then(({url})   => {
    console.log(`🚀  Running graphql server on ${url}`)})