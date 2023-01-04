const PDFDocument = require('pdfkit');
const fs = require('fs')
const PAGE_SIZE = 3

var bugs = require('../data/bugs.json')

module.exports = {
    query,
    get,
    remove,
    save,
    createPDF
}

function query(filterBy) {
    let filteredBugs = bugs
    console.log(filterBy)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        filteredBugs = filteredBugs.filter(bug => regex.test(bug.title))
    }
    if (filterBy.minSeverity) {
        filteredBugs = filteredBugs.filter(bug => bug.severity >= +filterBy.minSeverity)
    }
    if (filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        console.log('startIdx', startIdx)
        // fillteredCars = fillteredCars.slice(startIdx, PAGE_SIZE + startIdx)
    }
    return Promise.resolve(filteredBugs)
}

function get(bugId) {
    const bug = bugs.filter(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    bugs = bugs.filter(bug => bug._id !== bugId)
    return _writeBugsToFile()
}

function save(bug) {
    console.log('bug', bug)
    if (bug._id) {
        const bugToUpdate = bugs.find(currBug => currBug._id === bug._id)
        bugToUpdate.severity = bug.severity
    } else {
        bug._id = _makeId()
        bug.createdAt = new Date().getTime()
        bugs.push(bug)
    }
    return _writeBugsToFile().then(() => bug)
}

function createPDF() {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.font('Times-Bold').fontSize(31).text('List of current Bugs:', {
        align: 'center'
    })
    bugs.map((bug, idx) => {
        doc.pipe(fs.createWriteStream('output.pdf'))
        doc.font('Times-Bold').fontSize(21).text(`${idx}. ${bug.title}:`)
        doc.font('Times-Roman').fontSize(15).text(`${bug.description}. Severity of bug: ${bug.severity}`).moveDown(1.5)
    })
    doc.end()
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeBugsToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}