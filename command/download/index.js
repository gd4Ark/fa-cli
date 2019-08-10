require('module-alias/register')
const logger = require('@/lib/utils/logger')
const downloadTpl = require('@/lib/utils/download-template')
module.exports = () => {
  downloadTpl(name => {
    logger.success(`项目 ${name} 下载成功！`)
  })
}
