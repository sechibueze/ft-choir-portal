
const AuthResolvers = require('./AuthResolvers');
const UsersResolvers = require('./UsersResolvers');
module.exports = {
    Query: {
        hello: () => 'hi',
       ...AuthResolvers.Query,
       ...UsersResolvers.Query,
    },
    Mutation: {
        ...AuthResolvers.Mutation,
        // ...UsersResolvers.Mutation,
    },
}