import Axios from 'axios'
import * as Types from './types'

export const loadTransactions = () => dispatch => {

    Axios.get('/api/transactions')
        .then(response => {
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                palyload: {
                    transactions: response.data.transactions
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const addNewTransaction = transactions => dispatch => {
    Axios.post('/api/transactions', transactions)
        .then(response => {
            dispatch({
                type: Types.CREATE_TRANSACTION,
                palyload: {
                    transaction: response.data
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const removeTransaction = id => dispatch => {
    Axios.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_TRANSACTION,
                palyload: {
                    id: response.data._id
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}
export const updateTransaction = (id , transaction )=> dispatch => {
    Axios.put(`/api/transactions/${id}`,transaction)
        .then(response => {
            dispatch({
                type: Types.UPDATE_TRANSACTION,
                palyload: {
                    transaction: response.data.transaction
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}