import { GET_USER_URL } from "../src/utils/urls";

export const getUsersList = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(GET_USER_URL, {
            headers: {
                'Autirization': `Baeder${token}`
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}