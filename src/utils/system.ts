import logger from './logger'
const { existsSync } = require('fs')

export const exit = (message = 'system interruption'): void => {
  logger.fatal(message)
  process.exit()
}

export const existOrExit = (path: string, message = 'file not found'): void => {
  if (!existsSync(path)) {
    exit(message)
  }
}
