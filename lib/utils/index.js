const assert = require('assert')
const mkdirp = require('mkdirp')
const rm = require('rimraf')
const fs = require('fs')
const path = require('path')
const existsSync = fs.existsSync
const readFileSync = fs.readFileSync
const Handlebars = require('handlebars')
const upperFirst = require('lodash/upperFirst')

Handlebars.registerHelper('upperFirst', upperFirst)

function writeFile(filePath, contents, cb) {
    mkdirp(path.dirname(filePath), err => {
        if (err) return console.error(`${filePath}创建失败，${err}`)
        fs.writeFile(filePath, contents, cb)
    })
}

function getTemplte(filePath) {
    assert(existsSync(filePath), `getTemplate: file ${filePath} not fould`)
    const source = readFileSync(filePath, 'utf-8')
    return Handlebars.compile(source)
}

function generate(files, answers) {
    return new Promise((resolve, reject) => {
        const len = files.length
        let count = 0
        files.forEach(item => {
            const contents = getTemplte(item.from)(answers)
            writeFile(item.to, contents, err => {
                if (err) reject(err)
                count++
                if (count === len) {
                    resolve()
                }
            })
        })
    })
}

function deleteFiles(files) {
    return new Promise((resolve, reject) => {
        const len = files.length
        let count = 0
        files.forEach(item => {
            rm(item.path, err => {
                if (err) console.log('删除失败', err)
                count++
                if (count === len) {
                    resolve()
                }
            })
        })
    })
}

module.exports = {
    getTemplte,
    generate,
    deleteFiles
}
