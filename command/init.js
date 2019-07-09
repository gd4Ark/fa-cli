const { prompt } = require('inquirer')
const { existsSync } = require('fs')
const rmSync = require('rimraf').sync
const ora = require('ora')
const path = require('path')
const download = require('download-git-repo')
const logger = require('../lib/utils/logger')
const install = require('../lib/utils/install')
const getTemplateList = require('../lib/utils/getTemplateList')
const { template_path } = require('../config')

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

const run = async(project, to) => {
    const tplList = await getTemplateList()
    const choices = Object.keys(tplList)
    const questions = [
        {
            type: 'list',
            name: 'name',
            message: '请选择需要生成的模板：',
            choices: choices
        }
    ]
    prompt(questions).then(({ name }) => {
        const place = tplList[name]['owner/name']
        const branch = tplList[name]['branch']
        const tmp = path.join(template_path, name)
        const spinner = ora('模板下载中...')
        spinner.start()
        if (existsSync(tmp)) rmSync(tmp)
        download(`${place}#${branch}`, tmp, { clone: false }, err => {
            spinner.stop()
            if (err) return logger.fatal(err)
            install(project, tmp, to, err => {
                if (err) logger.fatal(err)
                logger.success('创建 %s 项目成功！', project)
            })
        })
    })
}
