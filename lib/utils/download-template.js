const ora = require('ora')
const path = require('path')
const download = require('download-git-repo')
const { prompt } = require('inquirer')
const rmSync = require('rimraf').sync
const logger = require('@/lib/utils/logger')
const { existsSync } = require('fs')
const getTemplateList = require('@/lib/utils/get-template-list')
const { tpl_path, git_repo_default_branch } = require('@/config')

module.exports = async cb => {
  const tplList = await getTemplateList()
  const choices = Object.keys(tplList)
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: '请选择需要生成的模板：',
      choices: choices
    },
    {
      type: 'input',
      name: 'branch',
      message: '请输入分支',
      default: git_repo_default_branch
    }
  ]
  prompt(questions).then(({ name, branch }) => {
    const place = tplList[name]['owner/name']
    const tpl = path.join(tpl_path, name)
    const spinner = ora('Download...')
    spinner.start()
    if (existsSync(tpl)) rmSync(tpl)
    download(`${place}#${branch}`, tpl, { clone: false }, err => {
      spinner.stop()
      if (err) return logger.fatal(err)
      cb(name, tpl)
    })
  })
}
