const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.name) {
        error.name = 'Please enter your name'
    }


    if (!user.email) {
        error.email = 'Please provide your email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid email'
    }

    if (!user.password) {
        error.password = 'Please provide password'
    } else if (user.password.length < 7) {
        error.password = 'password must be at least 7 characters'
    }
    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide your confirmPassword'
    } else if (user.password !== user.confirmPassword) {
        error.password = 'Password dose not match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }


}

module.exports = validate