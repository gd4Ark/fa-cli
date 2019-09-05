import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { deleteFiles } from '../../utils'
import { tpl_path, user_path, user_tpl_json_path } from '../../config'

export default async () => {
  existOrExit(
    user_tpl_json_path,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const fs = require('fs')
  const { join } = require('path')
  const { prompt } = require('inquirer')
  const ora = require('ora')

  const template = require(user_tpl_json_path)
  const template_name = template.name

  const generator_path = join(tpl_path, `${template_name}/generator`)

  const { questions, getTemplates } = require(join(generator_path, 'command/delete/page.js'))

  const answers = await prompt(questions)
  const files = getTemplates(answers, user_path)
  const spinner = ora('deleting Page ...')

  spinner.start()

  await deleteFiles(files)

  template.pages = template.pages.filter((item: any) => {
    if (item.name !== answers.name) {
      return item
    }
    return null
  })

  fs.writeFile(user_tpl_json_path, JSON.stringify(template), (err: any): void => {
    if (err) logger.fatal('delete fail', err)
    spinner.stop()
    logger.success(`delete page ${answers.name} successfully`)
  })
}
