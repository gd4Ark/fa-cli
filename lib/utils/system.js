const { existsSync } = require('fs')
const logger = require('./logger')

function exit(message = '系统中断') {
  logger.fatal(message)
  process.exit()
}

function existOrExit(path, message = '找不到此文件') {
  if (!existsSync(path)) {
    exit(message)
  }
}

module.exports = {
  exit,
  existOrExit
}
