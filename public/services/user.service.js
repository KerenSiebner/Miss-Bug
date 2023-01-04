import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BASE_URL = '/api/auth/'
const USER_KEY = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    getEmptyCredentials,
    login,
    signup,
    logout
}



function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || null)
}

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }
}

function login(credentials) {
    return axios.post(BASE_URL + 'login', credentials)
        .then(res => res.data)
        .then((user) => {
            _saveLoggedinUser(user)
            return user
        })
}

function signup(credentials) {
    return axios.post(BASE_URL + 'signup', credentials)
        .then(res => res.data)
        .then((user) => {
            _saveLoggedinUser(user)
            return user
        })
}

function logout(){
    return axios.post(BASE_URL +'logout')
    .then((res)=>{
        console.log('res.data', res.data)
        sessionStorage.removeItem(USER_KEY)
    }).catch (err=> console.log(err))
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}

