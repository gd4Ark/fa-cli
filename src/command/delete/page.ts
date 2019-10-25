import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { deleteFiles } from '../../utils'
import { TPL_PATH, USER_PATH, USER_TPL_JSON_PATH } from '../../config'

export default async (): Promise<void> => {
  existOrExit(
    USER_TPL_JSON_PATH,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const fs = require('fs')
  const { join } = require('path')
  const { prompt } = require('inquirer')
  const ora = require('ora')

  const template = require(USER_TPL_JSON_PATH)
  const templateName = template.name

  const generatorPath = join(TPL_PATH, `${templateName}/generator`)

  const { questions, getTemplates } = require(join(generatorPath, 'command/delete/page.js'))

  const answers = await prompt(questions)
  const files = getTemplates(answers, USER_PATH)
  const spinner = ora('deleting Page ...')

  spinner.start()

  await deleteFiles(files)

  template.pages = template.pages.filter((item: any): any => {
    if (item.name !== answers.name) {
      return item
    }
    return null
  })

  fs.writeFile(USER_TPL_JSON_PATH, JSON.stringify(template), (err: any): void => {
    if (err) logger.fatal('delete fail', err)
    spinner.stop()
    logger.success(`delete page ${answers.name} successfully`)
  })
}
