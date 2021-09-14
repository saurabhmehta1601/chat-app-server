import {gql} from "apollo-server"

const typeDefs = gql`

    type Message {
        author: String!
        content: String!
    }

    type Query {
        getMessages:[Message!]! 
    }

    type Mutation {
        createMessage(author:String!, content:String!): Message!
    }
`
export default typeDefs