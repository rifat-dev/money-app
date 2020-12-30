import { createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers/rootReducers'


const midleware = [thunk]
const store = createStore(rootReducers,compose(
     applyMiddleware(...midleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store