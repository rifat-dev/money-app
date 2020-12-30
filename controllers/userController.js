const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')


const User = require('../model/user')


exports.registerPostController = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    let validator = registerValidator({ name, email, password, confirmPassword })

    if (!validator.isValid) {
        res.status(400).json(validator.error)
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    res.status(400).json({
                        message: 'Email already exists'
                    })
                }



                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Server error occurred'
                        })
                    }

                    let user = new User({
                        name,
                        email,
                        password: hash,
                        balance:0,
                        income:0,
                        expense:0,
                    })

                    user.save()
                        .then(user => {
                            
                            res.status(201).json({ user })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: 'Server error'
                            })
                        })


                })
            })
            .catch(err => {
                next(err)
                console.log(err)
                res.status(500).json({
                    message: 'Server error'
                })
            })
    }

}

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body
    let valid = loginValidator({ email, password })

    if (!valid.isValid) {
        return res.status(400).json(valid.error)
    }

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'User Not Found'
            })
        }

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            res.status(400).json({
                message:'invalid email or password'
            })
        }

        let token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            balance: user.balance,
            income: user.income,
            expense: user.expense,
            transactions: user.transactions,
        }, 'KEY', { expiresIn: '2h' })


        res.status(200).json({
            message: 'Login Success',
            token: `Bearer ${token}`
        })





    } catch (e) {
        next(e)
    }
}