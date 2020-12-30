const Transaction = require('../model/transaction')
const User = require('../model/user')

exports.allTransactionsGetController = (req, res,next) => {
    
    let userId = req.user._id
    Transaction.find({author:userId})
        .then((transactions) => {
              if (transactions.length==0){
                   return res.status(200).json({message:'No transaction found'})
              }else{
                  return res.status(200).json({
                       transactions:transactions
                  })
              }
        })
        .catch((error) => {
            console.log(error)
            next(error)
            res.status(500).json({
                message: 'Server error'
            })
        })

}

exports.transactionPostController = (req, res, next) => {
    let { amount, note, type } = req.body
    let userId = req.user._id
    console.log(req.body)
    let transaction = new Transaction({
        amount,
        note,
        type,
        author: userId
    })

    transaction.save()
        .then(trans => {
            let updatedUser = { ...req.user._doc }

            if (type === 'income') {
                updatedUser.balance = updatedUser.balance + amount
                updatedUser.income = updatedUser.income + amount


            } else if (type === 'expense') {
                updatedUser.balance = updatedUser.balance - amount
                updatedUser.expense = updatedUser.expense + amount
            }

            updatedUser.transactions.push(trans._id)

            User.findByIdAndUpdate(
                { _id: updatedUser._id },
                { $set: updatedUser },
                { new: true }
            )
                .then((updatedUser) =>{
                    return res.status(201).json({
                        message: 'Transaction created successfully',
                        ...trans._doc,
                        updatedUser
                    })
                })
                .catch(err => {
                    console.log(err)
                    next(error)
                    res.status(500).json({
                        message: 'Server error'
                    })
                })
        })
        .catch(err => {
            console.log(err)
            next(error)
            res.status(500).json({
                message: 'Server error'
            })
        })
}

exports.singleTransactionGetController = (req, res, next) => {
         let transactionId = req.params.transactionId

         Transaction.findOne({_id:transactionId})
                .then((transaction) =>{
                        if(!transaction){
                            res.status(200).json({message:'No transaction found'})
                        }else{
                            res.status(200).json({
                                transaction: transaction
                            })
                        }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: 'Server error'
                    })
                })
}

exports.transactionPutController = (req, res, next) => {

    let transactionId = req.params.transactionId
    Transaction.findOneAndUpdate({_id:transactionId},{$set:req.body},{new: true})
        .then(result =>{
            res.status(200).json({
                message: 'Transaction updated successfully',
                transaction: result
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: 'Server error'
            })
        })
}

exports.transactionDeleteController = (req, res, next) => {
    let transactionId = req.params.transactionId
    console.log(transactionId)
    Transaction.findByIdAndDelete({_id:transactionId})
               .then(result=>{
                     res.status(200).json({
                        message: 'Transaction Deleted successfully',
                        ...result._doc
                   })
                })
               .catch(err =>{
                   console.log(err)
                   res.status(500).json({
                      message: 'Server error'
                   })
               })
}

