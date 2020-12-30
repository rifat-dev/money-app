import * as Types from '../actions/types'



const transactionsReducer = (state = [], action) =>{
     
    switch(action.type){
        case Types.LOAD_TRANSACTIONS:{
            return action.palyload.transactions
            
        }
        case Types.CREATE_TRANSACTION:{
            const transactions = [...state]
            transactions.unshift(action.palyload.transaction)
            return transactions
        }
        case Types.REMOVE_TRANSACTION:{
            const transactions = [...state]
            return transactions.filter(trans=>{
                return trans._id !== action.palyload.id
            })
        }
        case Types.UPDATE_TRANSACTION:{
            const transactions = [...state]
            transactions.map(trans=>{
                if(trans._id === action.palyload.transaction._id){
                    return action.palyload.transaction
                }
                return trans
            })
        }
        default: return state
    }
}

export default transactionsReducer