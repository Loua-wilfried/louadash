import React,{useCallback , useEffect, useState} from 'react'
import axios from 'axios';

const acessToken = '175|sDh6gYRw6pkPi9IxjeQthS0sOYU0ASVBwCvuwYpq';
const apiUr = 'https://iwadeli.herokuapp.com/api';

const authAxios = axios.create({
    baseURL: apiUr,

    headers{
        Autorization: `bearer ${acessToken}`
    }
})
const token = () => {
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError,] = useState();

    const fetchData = useCallback(async () => {
        try {
            // fetch annd set user
            const result = await authAxios .get(`${apiUr}/getUsers`);
            getUsers(result.data);
        } catch (err) {
            // set request error message
            setRequestError(err.message)
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default token
