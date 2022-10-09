import axios from 'axios'
import { login_url,token_verify_url } from '../utils/urls'


export const login = (login_data)=>{
return new Promise((resolve,reject)=>{
    axios.post(login_url,login_data)
    .then(data=>{
        resolve(data)
    })
    .catch(err=>{
        reject(err)
    })
})
}

// TOKEN VERIFY
/**
 *  enter user token
 * @param {STRING} token 
 * @returns 
 */
export const token_verify = (token)=>{
    return new Promise((resolve,reject)=>{
        axios.post(token_verify_url,token)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}