const router = require('express').Router()

const {
    allTransactionsGetController,
    transactionPostController,
    singleTransactionGetController,
    transactionPutController,
    transactionDeleteController
} = require('../controllers/transactionController')

const authenticate = require('../utils/authenticate')



router.get('/',authenticate,allTransactionsGetController)

router.post('/',authenticate,transactionPostController)

router.get('/:transactionId',singleTransactionGetController)

router.put('/:transactionId',transactionPutController)

router.delete('/:transactionId',authenticate,transactionDeleteController)


module.exports = router