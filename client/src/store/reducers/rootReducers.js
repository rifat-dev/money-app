import {combineReducers} from 'redux'
import authReducer from './authReducer'
import  transactionsReducer from './transactionsReducer'


const rootReducers = combineReducers({
    auth:authReducer,
    transactions:transactionsReducer
})

export default rootReducers