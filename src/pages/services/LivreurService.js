import React from 'react'
import axios from 'axios';
const EMPLOYEE_API_BASE_URL = "lien Api";



class LivreurService {

    getLivreurs(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createLivreurs(livreurs){
        return axios.post(EMPLOYEE_API_BASE_URL, livreurs);
    }

    getLivreursId(livreursId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + livreursId);
    }

    updateLivreurs(livreurs, livreursId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + livreursId, livreurs);
    }

    deleteLivreurs(livreursId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + livreursId);
    }
}

export default new LivreurService()
