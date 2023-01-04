const fs = require('fs')

const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret-bug-9696')
var users = require('../data/user.json')
var bugs = require('../data/bugs.json')


module.exports = {
    login,
    signup,
    getLoginToken,
    getCreatorBugs
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}
function login(credentials) {
    const user = users.find(user => user.username === credentials.username)
    if (!user) return Promise.reject('Login failed')
    return Promise.resolve(user)
}

function signup({ fullname, username, password }) {
    const userToSave = {
        _id: _makeId(),
        fullname,
        username,
        password
    }
    users.push(userToSave)
    return _writeUsersToFile().then(() => userToSave)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeUsersToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(users, null, 2)
        fs.writeFile('data/user.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        })
    })
}

function getCreatorBugs(userId){
    const userBugs = bugs.filter(bug => bug.creator._id === userId)
    return Promise.resolve(userBugs)
}