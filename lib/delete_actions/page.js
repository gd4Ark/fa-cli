const fs = require('fs')
const { join } = require('path')
const { prompt } = require('inquirer')
const ora = require('ora')
const { user_path, template_json_path } = require('../../config/')
const utils = require('../utils')
const logger = require('../utils/logger')

const templteJson = require(template_json_path)

const question = [
    {
        name: 'page',
        type: 'input',
        message: '属于哪个页面',
        default: 'admin',
        validate(val) {
            if (val === '') {
                return '页面为必填'
            }
            return true
        }
    },
    {
        name: 'name',
        type: 'input',
        message: '请输入页面名称(英文)',
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
            path: join(user_path, `src/common/data/modules/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/router/routers/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/store/modules/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/views/${name}`)
        }
    ]
}

module.exports = async() => {
    const answers = await prompt(question)
    const files = getFileTplList(answers)
    const spinner = ora('删除页面中...')
    spinner.start()
    await utils.deleteFiles(files)
    templteJson.pages = templteJson.pages.filter(item => {
        if (item.name !== answers.name) {
            return item
        }
    })
    fs.writeFile(template_json_path, JSON.stringify(templteJson), err => {
        if (err) logger.fatal('删除失败！', err)
        spinner.stop()
        logger.success(`删除页面 ${answers.name} 成功`)
    })
}
