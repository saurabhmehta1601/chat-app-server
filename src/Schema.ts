import {gql} from "apollo-server-express"

const typeDefs = gql`

    type Message {
        author: String!
        content: String!
    }

    type User {
        username: String!
        password: String!
    }

    type loginReturn {
        accessToken: String!
    }

    type Query {
        allMessages:[Message!]! 
    }

    type Mutation {
        register (username:String!,password:String!): User! 
        login(username:String!,password:String!): loginReturn! 
        createMessage(author:String!, content:String!): Message!
    }
`
export default typeDefs