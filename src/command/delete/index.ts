import { Obj } from '../../types'
import logger from '../../utils/logger'
import page from './page'

const actions: Obj = {
  page
}

export default (type: string): void => {
  if (actions[type]) {
    page().catch(console.error)
  } else {
    logger.fatal(`type not found：${type}`)
  }
}
