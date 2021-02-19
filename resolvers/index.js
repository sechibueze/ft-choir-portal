const { AuthenticationError } = require('apollo-server-express');
const fetch = require('node-fetch');
const { baseURL } = require('../config/constants');
module.exports = {
    Query: {
        hello: () => 'hi',
        me: (_, args, context) => {
            const authToken = context.headers["x-auth-token"] || '';
            const fetchOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": authToken
                }
            }
            const url = `${baseURL}/api/members/auth`;
            return fetch(url, fetchOptions)
                .then(r => r.json())
                .then(data => {
                    console.log('me res', data)
                    if (!data.status) {
                        throw new Error("Failed to get auth user", { error: data.error})
                    }
                    const { firstname, lastname, email, _id: id, auth } = data.data
                    return {
                        id,
                        firstname,
                        lastname,
                        email,
                        password: 'Invalid',
                        auth
                    }
                })
                .catch(err => {
                    throw new Error('Authentication erro', err)
                })
        },
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
    Mutation: {
        signup: (_, {accessId, firstname, lastname, email, password }, context) => {
            // Validate email and password
            const userData = { accessId, firstname, lastname, email, password };
            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            }
            const url = `${context.headers.origin}/api/members`;
            return fetch(url, fetchOptions)
                    .then(r => r.json())
                    .then(data => {
                        if (!data.status) {
                            throw new AuthenticationError('Login error', data.error)
                        }
                        return {
                            token: data.token
                        }
                    })
                    .catch(err => {
                        console.log('err ', err)
                        throw new Error(err)
                    })
        },
        login: (_, { email, password }, context) => {
            // Validate email and password
            const loginData = { email, password };
            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' },
            }
            const url = `${context.headers.origin}/api/members/login`;
            console.log('url', url, loginData)
            return fetch(url, fetchOptions)
                    .then(r => r.json())
                    .then(data => {
                        console.log('data login', data)
                        if (!data.status) {
                            throw new AuthenticationError('Login error', data.error)
                        }
                        return {
                            token: data.token
                        }
                    })
                    .catch(err => {
                        throw new Error(err)
                    })
        },
    },
}