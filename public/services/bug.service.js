import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BASE_URL = '/api/bug/'
// const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getPDF,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter(), sort) {
    console.log(filterBy);
    const queryParams = `?title=${filterBy.title}&minSeverity=${filterBy.minSeverity}&pageIdx=${filterBy.pageIdx}&sort='createdAt'&desc=${sort}`
    return axios.get(BASE_URL + queryParams)
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then((res) => res.data)
}

function save(bug) {
    console.log('bug', bug)
    const url = (bug._id) ? BASE_URL + `${bug._id}` : BASE_URL
    const method = (bug._id) ? 'put' : 'post'
    console.log('method', method)
    console.log('url', url)
    return axios[method](url, bug).then(res => res.data)
}

function getEmptyBug(id = '', title = '', description = '', severity = 0, createdAt = 0) {
    return { id, title, description, severity, createdAt }
}

function getPDF() {
    return axios.get(BASE_URL + 'save_pdf')
}

function getDefaultFilter() {
    return { title: '', minSeverity: 0 , pageIdx: 0}
}
