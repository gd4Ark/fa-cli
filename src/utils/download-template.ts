import { initAnswer, downloadQuestion, downloadAnswer, templates } from '../types/index'
import { tpl_path, git_repo_default_branch } from '../config'
import getTemplateList from './get-template-list'
import logger from './logger'
const ora = require('ora')
const path = require('path')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const rmSync = require('rimraf').sync
const { existsSync } = require('fs')

const getQuestions = (choices: string[]): downloadQuestion[] => {
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
      default: git_repo_default_branch
    }
  ]
}

export default async (): Promise<initAnswer> => {
  const tpls: templates = await getTemplateList()
  const choices = Object.keys(tpls)
  const questions = getQuestions(choices)
  const { name, branch }: downloadAnswer = await inquirer.prompt(questions)
  const place: string = tpls[name]['owner/name']
  const tpl: string = path.join(tpl_path, name)
  const res: initAnswer = { name, tpl }
  const spinner = ora('download...')

  spinner.start()

  if (existsSync(tpl)) rmSync(tpl)

  return new Promise<initAnswer>((resolve, rejects) => {
    download(`${place}#${branch}`, tpl, { clone: false }, (err: any) => {
      spinner.stop()
      if (err) return logger.fatal(err)
      resolve(res)
    })
  })
}
