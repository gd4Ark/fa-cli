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
    'command/add/page.js'
))

module.exports = async() => {
    const answers = await prompt(question)
    const files = getFileTplList(answers, user_path)
    const spinner = ora('添加页面中...')
    spinner.start()
    await utils.generate(files, answers)
    templteJSON.pages.push(answers)
    fs.writeFile(template_json_path, JSON.stringify(templteJSON), err => {
        if (err) logger.fatal('创建失败！', err)
        spinner.stop()
        logger.success(`添加页面 ${answers.name} 成功`)
    })
}
