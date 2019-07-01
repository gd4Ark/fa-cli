const { join } = require('path')
const { prompt } = require('inquirer')
const assert = require('assert')
const fs = require('fs')
const readFileSync = fs.readFileSync
const existsSync = fs.existsSync

const { ROOT_PATH, TEMPLATE_PATH, USER_PATH } = require('../../config/')

const pages = require(`${USER_PATH}/template.json`).pages

const { render } = require('consolidate').handlebars
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

Handlebars.registerHelper('if_eq', (a, b, opts) =>
    a === b ? opts.fn(this) : opts.inverse(this)
)

const question = [
    {
        name: 'name',
        type: 'input',
        message: '请输入页面名称(英文)',
        validate(val) {
            if (val === '') {
                return '页面名称为必填'
            } else if (pages.find(item => item.name === val)) {
                return '页面名称已存在'
            } else {
                return true
            }
        }
    },
    {
        name: 'title',
        type: 'input',
        message: '请输入页面标题(中文)',
        validate(val) {
            if (val === '') {
                return '页面名称为必填'
            } else if (pages.find(item => item.title === val)) {
                return '页面标题已存在'
            } else {
                return true
            }
        }
    }
]

module.exports = () => {
    prompt(question).then(answers => {
        const { name, title } = answers
        const filePath = join(TEMPLATE_PATH, 'generator/tpl.vue')
        const source = readFileSync(filePath, 'utf-8')
        console.log(Handlebars.compile(source)(answers))
    })
}
