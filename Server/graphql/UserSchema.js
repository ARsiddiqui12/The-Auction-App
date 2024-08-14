import { buildSchema } from "graphql";

const schema = buildSchema(`
    type User {
        id: ID,
        username: String,
        email: String,
        password: String,
        mobile: String,
        token:String
    }

    type Auction {
        userid: String,
        title: String,
        price: String,
        comments:String,
        postimage:String
    }

    

    type Query {
        getUser(id: ID!): User,
        getAllUsers : [User]
        getUserAuctions: [Auction]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, mobile: String!): User,
        loginUser(email: String!, password: String!): User,
        PostAnAuction(userid:String!, title:String!, price:String!, comments:String!, postimage:String!):Auction
    }
`);

export default schema;