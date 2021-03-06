const { AuthenticationError, UserInputError } = require('apollo-server-express');
const fetch = require('node-fetch');
module.exports = {
    Query: {
        
        getUsers: (_, args, context) => {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": context.headers["x-auth-token"] || ''
                }
            }
            const url = `${context.headers.origin}/api/members`;
            return fetch(url, fetchOptions)
                .then(r => r.json())
                .then(data => {
                    if (!data.status) {
                        throw new AuthenticationError('getUsers error', data.error)
                    }
                    return data.data
                })
                .catch(err => {
                    throw new Error('Authentication erro', err)
                })
        },
    },
    // Mutation: {
        
    // },
}