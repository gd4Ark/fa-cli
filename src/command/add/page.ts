import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { generate } from '../../utils'
import { TPL_PATH, USER_PATH, USER_TPL_JSON_PATH } from '../../config'
import { Obj } from '../../types'

export default async () => {
  existOrExit(
    USER_TPL_JSON_PATH,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const ora = require('ora')
  const { writeFile } = require('fs')
  const { join } = require('path')
  const { prompt } = require('inquirer')
  const templte: Obj = require(USER_TPL_JSON_PATH)
  const templateName: string = templte.name
  const generatorPath: string = join(TPL_PATH, `${templateName}/generator`)
  const { getQuestions, getTemplates } = require(join(generatorPath, 'command/add/page.js'))
  const questions = getQuestions(USER_PATH)
  const answers = await prompt(questions)
  const files = getTemplates(answers, USER_PATH)

  const spinner = ora('creating page...')
  spinner.start()
  await generate(files, answers)
  templte.pages.push(answers)

  writeFile(USER_TPL_JSON_PATH, JSON.stringify(templte), (err: any): void => {
    if (err) logger.fatal('failed to create page：', err)
    spinner.stop()
    logger.success(`create page ${answers.name} successfully`)
  })
}
