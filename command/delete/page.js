const fs = require('fs')
const { join } = require('path')
const { prompt } = require('inquirer')
const ora = require('ora')
const { template_path, user_path, template_json_path } = require('../../config')
const utils = require('../../lib/utils')
const logger = require('../../lib/utils/logger')

const templteJSON = require(template_json_path)
const template_name = templteJSON.name

const generator_path = join(template_path, `${template_name}/generator`)

const { question, getFileTplList } = require(join(
    generator_path,
    'command/delete/page.js'
))

module.exports = async() => {
    const answers = await prompt(question)
    const files = getFileTplList(answers, user_path)
    const spinner = ora('删除页面中...')
    spinner.start()
    await utils.deleteFiles(files)
    templteJSON.pages = templteJSON.pages.filter(item => {
        if (item.name !== answers.name) {
            return item
        }
    })
    fs.writeFile(template_json_path, JSON.stringify(templteJSON), err => {
        if (err) logger.fatal('删除失败！', err)
        spinner.stop()
        logger.success(`删除页面 ${answers.name} 成功`)
    })
}
