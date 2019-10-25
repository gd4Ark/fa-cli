import { existOrExit } from '../../utils/system'
import logger from '../../utils/logger'
import { USER_TPL_JSON_PATH } from '../../config'
const { isEmpty } = require('lodash')

export default (): void => {
  existOrExit(
    USER_TPL_JSON_PATH,
    'The template.json file could not be found, please make sure to run this command in the project root directory!'
  )

  const pages = require(USER_TPL_JSON_PATH).pages

  logger.success('Page List：')

  if (isEmpty(pages)) {
    return console.log('list is empty')
  }

  pages.forEach((item: object): void => {
    console.log(`=>`, item)
  })
}
