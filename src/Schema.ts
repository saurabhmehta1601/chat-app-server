import {gql} from "apollo-server"

const typeDefs = gql`

    type User {
        username: String!
        avatar_url: String
    }

    type Message {
        user: User!
        content: String!
    }

    type Query {
        getMessages:[Message!]! 
    }

`
export default typeDefs