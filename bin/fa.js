#!/usr/bin/env node

const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')

program
    .command('init [project-name]')
    .description('Initialize a project')
    .alias('i')
    .action((project = '.') => {
        require('../command/init')(project)
    })

program
    .command('add [type]')
    .description('Add, optional [page], default is page')
    .alias('a')
    .action((type = 'page') => {
        require('../command/add')(type)
    })

program
    .command('delete [type]')
    .description('Delete, optional [page], default to page.')
    .alias('d')
    .action((type = 'page') => {
        require('../command/delete')(type)
    })

program
    .command('list [type]')
    .description('List, optional [page], default is page')
    .alias('l')
    .action((type = 'page') => {
        require('../command/list')(type)
    })

program.parse(process.argv)

if (!program.args.length) {
    program.help()
}
