const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String
    email:String
    password: String
    savedWork: [Work]
}

type Work{
    _id: ID
    question: String
    solution: String
}

input WorkInput{
    question: String
    solution: String
}

type Auth{
    token:ID!
    user:User
}
type Query{
   user: User
   savedFiles(_id: ID): User
   oneUser(email:String!):User
}
type Mutation{
    addUser( email:String!, password:String!, username: String):Auth
    login(email:String!,password:String!):Auth
    saveWork(solutionData: WorkInput!): User
    removeWork(_id: ID): User
    updateUsername(username:String!):User
}

`
module.exports = typeDefs;