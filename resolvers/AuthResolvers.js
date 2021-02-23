const { AuthenticationError, UserInputError } = require('apollo-server-express');
const fetch = require('node-fetch');
const { baseURL } = require('../config/constants');
const { validateLoginInput, validateEmailInput, validatePasswordInput } = require('../validations')
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
            const loginData = { email, password };
            // Validate email and password
            const { errors, valid } = validateLoginInput(email, password);
       
            if (!valid) {
                throw new UserInputError('Incorrect User Data', { errors })
            }

            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' },
            }
            const url = `${context.origin}/api/members/login`;
          
            return fetch(url, fetchOptions)
                    .then(r => r.json())
                    .then(data => {
                        console.log('data login', data)
                        if (!data.status) {
                            throw new AuthenticationError('Login error', {
                                errors: data.error
                            })
                        }
                        return {
                            token: data.token
                        }
                    })
                    .catch(err => {
                        console.log('et', err)
                        throw new Error(err)
                    })
        },
        sendPasswordResetLink: (_, { email }, context ) => {
            // Validate email 
            const { errors, valid } = validateEmailInput(email);
       
            if (!valid) {
                throw new UserInputError('Incorrect User Data', { errors })
            }

            const fetchOptions = {
                method: 'PUT',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' },
            }
            const url = `${context.origin}/api/members/forgotpassword`;
          
            return fetch(url, fetchOptions)
                    .then(r => r.json())
                    .then(data => {
                        console.log('sendPasswordResetLink ', data)
                        if (!data.status) {
                            throw new AuthenticationError('Login error', {
                                errors: {
                                    email: data.error
                                }
                            })
                        }
                        return {
                            status: data.status,
                            data: data.message
                        }
                    })
                    .catch(err => {
                        console.log('sendPassword rest Link', err)
                        throw new Error(err)
                    })
        },
        resetPassword: (_, { passwordResetToken, newPassword}, context) => {
            console.log('resetPassword email', passwordResetToken)
            // Validate email 
            const { errors, valid } = validatePasswordInput(newPassword);
       
            if (!valid) {
                throw new UserInputError('Incorrect User Data', { errors })
            }

            const fetchOptions = {
                method: 'PUT',
                body: JSON.stringify({ passwordResetToken, password: newPassword }),
                headers: { 'Content-Type': 'application/json' },
            }
            const url = `${context.origin}/api/members/resetpassword`;
          
            return fetch(url, fetchOptions)
                    .then(r => r.json())
                    .then(data => {
                        console.log('resetPassword ', data)
                        if (!data.status) {
                            let errors = { email: data.error}
                            throw new Error('Password Reset error', { errors: data.error })
                        }
                        return {
                            status: data.status,
                            data: data.message
                        }
                    })
                    .catch(err => {
                        console.log('resetPassword rest Link', err)
                        throw new Error(err)
                    })
        }
    },
}