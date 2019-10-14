import { obj } from '../../types'
import logger from '../../utils/logger'
import page from './page'

const actions: obj = {
  page
}

export default (type: string): void => {
  if (actions[type]) {
    page()
  } else {
    logger.fatal(`type not found：${type}`)
  }
}
