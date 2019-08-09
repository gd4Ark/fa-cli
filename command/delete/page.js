require('module-alias/register')
const fs = require('fs')
const { join } = require('path')
const { prompt } = require('inquirer')
const { existOrExit } = require('@/lib/utils/system')
const ora = require('ora')
const { tpl_path, user_path, user_tpl_json_path } = require('@/config')
const utils = require('@/lib/utils')
const logger = require('@/lib/utils/logger')

existOrExit(
  user_tpl_json_path,
  '找不到 template.json 文件，请确保在项目根目录运行此命令！'
)

const templteJSON = require(user_tpl_json_path)
const template_name = templteJSON.name

const generator_path = join(tpl_path, `${template_name}/generator`)

const { question, getFileTplList } = require(join(
  generator_path,
  'command/delete/page.js'
))

module.exports = async() => {
  const answers = await prompt(question)
  const files = getFileTplList(answers, user_path)
  const spinner = ora('Deleting Page ...')
  spinner.start()
  await utils.deleteFiles(files)
  templteJSON.pages = templteJSON.pages.filter(item => {
    if (item.name !== answers.name) {
      return item
    }
    return null
  })
  fs.writeFile(user_tpl_json_path, JSON.stringify(templteJSON), err => {
    if (err) logger.fatal('Delete Fail', err)
    spinner.stop()
    logger.success(`Delete Page ${answers.name} Success`)
  })
}
