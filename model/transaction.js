const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    note:{
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }


}, { timestamps: true })

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction