#!/usr/bin/env node

const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')

program
    .command('init [project-name]')
    .description('初始化一个项目')
    .alias('i')
    .action((project = '.') => {
        require('../command/init')(project)
    })

program
    .command('add [type]')
    .description('添加，可选[page]，默认为 page')
    .alias('a')
    .action((type = 'page') => {
        require('../command/add')(type)
    })

program
    .command('delete [type]')
    .description('删除，可选[page]，默认为 page')
    .alias('d')
    .action((type = 'page') => {
        require('../command/delete')(type)
    })

program
    .command('list [type]')
    .description('列出，可选[page]，默认为 page')
    .alias('l')
    .action((type = 'page') => {
        require('../command/list')(type)
    })

program.parse(process.argv)

if (!program.args.length) {
    program.help()
}
