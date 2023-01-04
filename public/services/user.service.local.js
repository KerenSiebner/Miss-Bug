import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_KEY = 'currUser'

export const userService = {
    getLoggedinUser,
    getEmptyCredentials,
    login,
    signup
}

_createUsers()

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }
}

function login(credentials) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === credentials.username)
            if (!user) return Promise.reject('Login failed')
            _saveLoggedinUser(user)
            return user
        })
}

function signup(credentials) {
    return storageService.post(USER_KEY, credentials)
        .then(user => {
            _saveLoggedinUser(user)
            return user
        })
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}

function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        const users = [
            {
                "_id": "u101",
                "username": "puki",
                "fullname": "Puki Ja",
                "password": "secret1",
                "score": 100
            },
            {
                "_id": "u102",
                "username": "muki",
                "fullname": "Muki Ba",
                "password": "secret2",
                "score": 78
            },
            {
                "_id": "CayA7",
                "fullname": "Xuki Ada",
                "username": "xuki",
                "password": "xuki"
            },
            {
                "_id": "oT4BY",
                "fullname": "Xuki Ada",
                "username": "xuki",
                "password": "xuki"
            },
            {
                "_id": "jpnFM",
                "fullname": "Nini op",
                "username": "nini",
                "password": "nini"
            },
            {
                "_id": "jpnFM",
                "fullname": "gilad zilberman",
                "username": "gilad",
                "password": "emma"
            }
        ]
        utilService.saveToStorage(USER_KEY, users)
    }
}