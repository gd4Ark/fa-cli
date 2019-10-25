import { InitAnswer, DownloadQuestion, DownloadAnswer, Templates } from '../types/index'
import { TPL_PATH, GIT_REPO_DEFAULT_BRANCH } from '../config'
import getTemplateList from './get-template-list'
import logger from './logger'
const ora = require('ora')
const path = require('path')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const rmSync = require('rimraf').sync
const { existsSync } = require('fs')

const getQuestions = (choices: string[]): DownloadQuestion[] => {
  return [
    {
      type: 'list',
      name: 'name',
      message: 'choose a template',
      choices: choices
    },
    {
      type: 'input',
      name: 'branch',
      message: 'use branch',
      default: GIT_REPO_DEFAULT_BRANCH
    }
  ]
}

export default async (): Promise<InitAnswer> => {
  const tpls: Templates = await getTemplateList()
  const choices = Object.keys(tpls)
  const questions = getQuestions(choices)
  const { name, branch }: DownloadAnswer = await inquirer.prompt(questions)
  const place: string = tpls[name]['owner/name']
  const tpl: string = path.join(TPL_PATH, name)
  const res: InitAnswer = { name, tpl }
  const spinner = ora('download...')

  spinner.start()

  if (existsSync(tpl)) rmSync(tpl)

  return new Promise<InitAnswer>((resolve, rejects): void => {
    download(`${place}#${branch}`, tpl, { clone: false }, (err: any) => {
      spinner.stop()
      if (err) return logger.fatal(err)
      resolve(res)
    })
  })
}
