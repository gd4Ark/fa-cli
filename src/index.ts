import command from './command/index'

export default (): void => {
  const program = require('commander')

  program.version(require('../package').version).usage('<command> [options]')

  program
    .command('init [project-name]')
    .description('Initialize a project')
    .alias('i')
    .action((project: string = '.'): void => {
      command.init(project)
    })

  program
    .command('download')
    .description('Download project template')
    .alias('load')
    .action((): void => {
      command.download().catch(console.error)
    })

  program
    .command('add [type]')
    .description('Add, optional [page], default is page')
    .alias('a')
    .action((type: string = 'page'): void => {
      command.add(type)
    })

  program
    .command('delete [type]')
    .description('Delete, optional [page], default to page.')
    .alias('d')
    .action((type: string = 'page'): void => {
      command.delete(type)
    })

  program
    .command('list [type]')
    .description('List, optional [page], default is page')
    .alias('l')
    .action((type: string = 'page'): void => {
      command.list(type)
    })

  program.parse(process.argv)

  if (!program.args.length) {
    program.help()
  }
}
