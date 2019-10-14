import { obj, initAnswer } from '../../types'
import downloadTemplate from '../../utils/download-template'
import install from '../../utils/install'
import logger from '../../utils/logger'
const path = require('path')
const { prompt } = require('inquirer')
const { existsSync } = require('fs')

export default (project: string): void => {
  const inPlace: boolean = project === '.'
  const name: string = inPlace ? path.relative('../', process.cwd()) : project
  const to: string = inPlace ? process.cwd() : path.resolve(name)

  const needConfrim = inPlace || existsSync(to)
  const confirm = (): void => {
    prompt([
      {
        type: 'confirm',
        message: inPlace
          ? 'Are you sure you want to create a project in the current directory?'
          : 'The current directory already exists. Do you want to continue?',
        name: 'ok'
      }
    ])
      .then(({ ok }: obj): void => {
        if (ok) run(name, to)
      })
      .catch(logger.fatal)
  }

  needConfrim ? confirm() : run(name, to)
}

const run = async (project: string, to: string): Promise<void> => {
  const { tpl }: initAnswer = await downloadTemplate()

  install({ name: project, src: tpl, dest: to }).catch(logger.fatal)
}
