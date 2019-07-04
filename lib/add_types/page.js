const { join } = require('path')
const { prompt } = require('inquirer')
const upperFirst = require('lodash/upperFirst')
const { template_path, user_path } = require('../../config/')
const utils = require('../utils')

const pages = require(`${user_path}/template.json`).pages
const template_name = require(`${user_path}/template.json`).name
const generator_path = join(template_path, `${template_name}/generator`)

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
    },
    {
        name: 'page',
        type: 'input',
        message: '添加到页面',
        default: 'admin'
    }
]

function getFileTplList(answers) {
    const { name, page } = answers
    return [
        {
            from: join(generator_path, 'data/tpl.js'),
            to: join(user_path, `src/common/data/modules/${name}.js`)
        },
        {
            from: join(generator_path, 'router/tpl.js'),
            to: join(user_path, `src/pages/${page}/router/routers/${name}.js`)
        },
        {
            from: join(generator_path, 'store/tpl.js'),
            to: join(user_path, `src/pages/${page}/store/modules/${name}.js`)
        },
        {
            from: join(generator_path, 'view/tpl.vue'),
            to: join(user_path, `src/pages/${page}/views/${name}/index.vue`)
        },
        {
            from: join(generator_path, 'view/components/table.vue'),
            to: join(
                user_path,
                `src/pages/${page}/views/${name}/components/${upperFirst(
                    name
                )}Table.vue`
            )
        }
    ]
}

module.exports = () => {
    prompt(question).then(answers => {
        const files = getFileTplList(answers)
        utils.generate(files, answers)
    })
}
