import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { generate } from '../../utils'
import { tpl_path, user_path, user_tpl_json_path } from '../../config'
import { obj } from '../../types'

export default async () => {
  existOrExit(
    user_tpl_json_path,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const ora = require('ora')
  const { writeFile } = require('fs')
  const { join } = require('path')
  const { prompt } = require('inquirer')
  const templte: obj = require(user_tpl_json_path)
  const template_name: string = templte.name
  const generator_path: string = join(tpl_path, `${template_name}/generator`)
  const { getQuestions, getTemplates } = require(join(generator_path, 'command/add/page.js'))
  const questions = getQuestions(user_path)
  const answers = await prompt(questions)
  const files = getTemplates(answers, user_path)

  const spinner = ora('creating page...')
  spinner.start()
  await generate(files, answers)
  templte.pages.push(answers)

  writeFile(user_tpl_json_path, JSON.stringify(templte), (err: any): void => {
    if (err) logger.fatal('failed to create page：', err)
    spinner.stop()
    logger.success(`create page ${answers.name} successfully`)
  })
}
