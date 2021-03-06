
module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.trim()) {
        errors.email = "Email must not be empty";
    }
    if (!emailRegEx.test(email)) {
        errors.email = "Email is not well formatted";
    }
    if (!password) {
        errors.password = "Password must not be empty";
    }
    if (password.length < 6) {
        errors.password = "Password is too short";
    }
    return {
        errors,
        valid: Object.values(errors).length > 0 ? false : true
    }
}
module.exports.validatePasswordInput = ( password) => {
    const errors = {};
   
    if (!password) {
        errors.password = "Password must not be empty";
    }
    if (password.length < 6) {
        errors.password = "Password is too short";
    }
    return {
        errors,
        valid: Object.values(errors).length > 0 ? false : true
    }
}
module.exports.validateEmailInput = (email) => {
    const errors = {};
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.trim()) {
        errors.email = "Email must not be empty";
    }
    if (!emailRegEx.test(email)) {
        errors.email = "Email is not well formatted";
    }
    
    return {
        errors,
        valid: Object.values(errors).length > 0 ? false : true
    }
}