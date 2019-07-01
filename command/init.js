const { prompt } = require('inquirer')
const exists = require('fs').existsSync
const path = require('path')
const ora = require('ora')
const generate = require('../lib/utils/generate')
const logger = require('../lib/utils/logger')
const { TEMPLATE_PATH } = require('../config')

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
    const tmp = TEMPLATE_PATH
    generate(project, tmp, to, err => {
        if (err) logger.fatal(err)
        logger.success('创建 %s 项目成功！', project)
    })
}
