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
    .description('添加，可选[page、components]，默认为 page')
    .alias('a')
    .action((type = 'page') => {
        require('../command/add')(type)
    })

// program
//     .command("delete")
//     .description("删除一个页面")
//     .alias("d")
//     .action(() => {
//         require("../command/delete")
//     })

// program
//     .command("list")
//     .description("列出所有页面")
//     .alias("l")
//     .action(() => {
//         require("../command/list")
//     })

program.parse(process.argv)

if (!program.args.length) {
    program.help()
}
