import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './store';
import * as Types from './store/actions/types'
import setAuthToken from './utils/setAuthToken'

let token = localStorage.getItem('auth_token')

if(token){
  setAuthToken(token)
  let decode = jwtDecode(token)
  store.dispatch({
    type:Types.SET_USER,
    palyload:{
        user:decode
    }
  })
}


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
