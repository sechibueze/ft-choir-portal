const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User{
    accessId: String!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    auth: [String!]
}

type Result{
    status: Boolean!
    error: String
    data: String
}
type AuthResponse{
    token: String!
}
type Query{
    hello: String!
    me: User!
    getUsers: [User]!
}

type Mutation{
    login(email: String! password: String!): AuthResponse!
    signup(
        firstname: String! lastname: String! email: String! password: String! accessId: String!
    ): AuthResponse!
    sendPasswordResetLink(email: String!): Result!
    resetPassword(newPassword: String! passwordResetToken: String!): Result!
}
`;

module.exports = typeDefs;