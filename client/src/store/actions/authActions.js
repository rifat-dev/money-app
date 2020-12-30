import Axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user,history) =>{
    return dispatch =>{

        Axios.post('/api/users/register',user)
             .then((res) =>{
                 dispatch({
                     type:Types.USERS_ERROR,
                     palyload:{
                         error:{}
                     }
                 })
                 history.push('/login')
                 console.log(res)
             })
             .catch(err => {
                 dispatch({
                     type:Types.USERS_ERROR,
                     palyload:{
                         error:err.response.data
                     }
                 })
             })
   
   }
}


export const login = (user,history) => dispatch =>{
    Axios.post('/api/users/login',user)
         .then(res=>{
             let token = res.data.token
             setAuthToken(token)
             localStorage.setItem('auth_token',token)
             let decode = jwtDecode(token)
             
             dispatch({
                 type:Types.SET_USER,
                 palyload:{
                     user:decode
                 }
             })

             history.push('/dashbord')
         })
         .catch(err => {
            dispatch({
                type:Types.USERS_ERROR,
                palyload:{
                    error:err.response.data
                }
            })
         })
}


export const logout = history =>{
  
    return dispatch =>{
        localStorage.removeItem('auth_token')
        dispatch({
            type:Types.SET_USER,
            palyload:{
                user:{}
            }
        })
        history.push('/login')

    }
   
}

