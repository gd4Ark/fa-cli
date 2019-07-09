const fs = require('fs')
const { join } = require('path')
const { prompt } = require('inquirer')
const ora = require('ora')
const upperFirst = require('lodash/upperFirst')
const {
    template_path,
    user_path,
    template_json_path
} = require('../../config/')
const utils = require('../utils')
const logger = require('../utils/logger')

const templteJson = require(template_json_path)
const pages = templteJson.pages
const template_name = templteJson.name
const generator_path = join(template_path, `${template_name}/generator`)

let tmp_page_value = 'admin'
const question = [
    {
        name: 'page',
        type: 'input',
        message: '添加到页面',
        default: tmp_page_value,
        validate(val) {
            if (val === '') {
                return '页面名称为必填'
            }
            tmp_page_value = val
            return true
        }
    },
    {
        name: 'name',
        type: 'input',
        message: '请输入页面名称(英文)',
        validate(val) {
            const page = pages.find(
                item => item.name === val && item.page === tmp_page_value
            )
            if (val === '') {
                return '页面名称为必填'
            } else if (page) {
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
            } else {
                return true
            }
        }
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

module.exports = async() => {
    const answers = await prompt(question)
    const files = getFileTplList(answers)
    const spinner = ora('添加页面中...')
    spinner.start()
    await utils.generate(files, answers)
    templteJson.pages.push(answers)
    fs.writeFile(template_json_path, JSON.stringify(templteJson), err => {
        if (err) logger.fatal('创建失败！', err)
        spinner.stop()
        logger.success(`添加页面 ${answers.name} 成功`)
    })
}
