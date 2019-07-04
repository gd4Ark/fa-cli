const { prompt } = require('inquirer')
const exists = require('fs').existsSync
const rm = require('rimraf').sync
const path = require('path')
const download = require('download-git-repo')
const ora = require('ora')
const generate = require('../lib/utils/generate')
const logger = require('../lib/utils/logger')
const getGitTplList = require('../lib/utils/git-tpl-list')
const { template_path } = require('../config')

module.exports = project => {
    const inPlace = project === '.'
    const name = inPlace ? path.relative('../', process.cwd()) : project
    const to = inPlace ? process.cwd() : path.resolve(name)
    if (inPlace || exists(to)) {
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

const run = async(project, to) => {
    const gitList = await getGitTplList()
    const choices = Object.keys(gitList)
    const questions = [
        {
            type: 'list',
            name: 'name',
            message: '请选择需要生成的模板：',
            choices: choices
        }
    ]
    prompt(questions).then(({ name }) => {
        const gitPlace = gitList[name]['owner/name']
        const gitBranch = gitList[name]['branch']
        const tmp = path.join(template_path, name)
        const spinner = ora('模板下载中...')
        spinner.start()
        if (exists(tmp)) rm(tmp)
        download(`${gitPlace}#${gitBranch}`, tmp, { clone: false }, err => {
            spinner.stop()
            if (err) return logger.fatal(err)
            generate(project, tmp, to, err => {
                if (err) logger.fatal(err)
                logger.success('创建 %s 项目成功！', project)
            })
        })
    })
}
