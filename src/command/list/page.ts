import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { user_tpl_json_path } from '../../config'
const { isEmpty } = require('lodash')

export default (): void => {
  existOrExit(
    user_tpl_json_path,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const pages = require(user_tpl_json_path).pages

  logger.success('Page List：')

  if (isEmpty(pages)) {
    return console.log('list is empty')
  }

  pages.forEach((item: object): void => {
    console.log(`=>`, item)
  })
}
