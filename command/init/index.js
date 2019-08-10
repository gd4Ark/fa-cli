require('module-alias/register')
const path = require('path')
const downloadTpl = require('@/lib/utils/download-template')
const { prompt } = require('inquirer')
const { existsSync } = require('fs')
const logger = require('@/lib/utils/logger')
const install = require('@/lib/utils/install')

module.exports = project => {
  const inPlace = project === '.'
  const name = inPlace ? path.relative('../', process.cwd()) : project
  const to = inPlace ? process.cwd() : path.resolve(name)
  if (inPlace || existsSync(to)) {
    prompt([
      {
        type: 'confirm',
        message: inPlace
          ? '确定在当前目录下创建项目吗？'
          : '当前目录已存在，是否继续？',
        name: 'ok'
      }
    ])
      .then(({ ok }) => {
        if (ok) {
          run(name, to)
        }
      })
      .catch(logger.fatal)
  } else {
    run(name, to)
  }
}

const run = async (project, to) => {
  downloadTpl((name, tpl) => {
    install(project, tpl, to, err => {
      if (err) logger.fatal(err)
      logger.success('创建 %s 项目成功！', project)
    })
  })
}
