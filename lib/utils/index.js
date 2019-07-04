const assert = require('assert')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const existsSync = fs.existsSync
const readFileSync = fs.readFileSync
const Handlebars = require('handlebars')

Handlebars.registerHelper('upperFirst', str => {
    if (!str) {
        return console.error('错误: upperFirst 方法需要传入字符串类型的值')
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
})

function writeFile(filePath, contents, cb) {
    mkdirp(path.dirname(filePath), async err => {
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
    files.forEach(item => {
        const contents = getTemplte(item.from)(answers)
        writeFile(item.to, contents, () => {
            console.log(`创建成功：${item.to}`)
        })
    })
}

module.exports = {
    getTemplte,
    generate
}
