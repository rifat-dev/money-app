const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        trim:true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true,
        minlength:8
    },
    balance: Number,
    income: Number,
    expense: Number,
    transactions:{
        type: [{
            type:Schema.Types.ObjectId,
            ref:'Transaction'
        }]
    }

})


const User = model('User',userSchema)

module.exports = User