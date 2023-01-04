const express = require('express')
const cookieParser = require('cookie-parser')

const bugService = require('./services/bug-service.js')

const app = express()
const PORT = 3030

// Cookies lifespan is 7 sec's
const COOKIE_AGE = 1000 * 15
const IS_PREMIUM = false

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// List bugs
app.get('/api/bug', (req, res) => {
    const filterBy = req.query
    console.log('filterBy', filterBy)
    bugService.query(filterBy).then(bugs => {
        res.send(bugs)
    })
})

app.put('/api/bug/:bugId', (req, res) => {
    const bug = req.body
    console.log('bug', bug)
    bugService.save(bug)
    .then((savedBug) => res.send(savedBug))
    // bugService.createPDF()
    // res.send()
})

app.post('/api/bug',(req,res)=>{
    console.log('req', req)
    const bug = req.body
    bugService.save(bug).then((savedBug)=>res.send(savedBug))
})


// Save bugs
app.get('/api/bug/save', (req, res) => {
    const { title, description, severity, createdAt, _id } = req.query
    const bug = {
        title,
        description,
        severity: +severity,
        createdAt: +createdAt,
        _id
    }
    bugService.save(bug).then(savedBug => res.send(savedBug))
})

// Read bug - getById
app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    // const { currBugId } = req.cookies
    let visitCountIds = req.cookies.visitCountIds || []
    if (!visitCountIds.includes(bugId)) {
        if (visitCountIds.length >= 3 && !IS_PREMIUM) {
            return res.status(401).send('Wait for a bit')
        }
        visitCountIds.push(bugId)
    }


    bugService.get(bugId).then(bug => {
        res.cookie('visitCountIds', visitCountIds, { maxAge: COOKIE_AGE })
        res.send(bug)
    })

})

// Remove bug
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId).then(() => res.send({ msg: 'Bug removed succeessfully', bugId }))
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}: http://localhost:${PORT}/`))