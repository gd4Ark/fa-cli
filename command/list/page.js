require('module-alias/register')
const { existOrExit } = require('@/lib/utils/system')
const logger = require('@/lib/utils/logger')
const { user_tpl_json_path } = require('@/config')
const { isEmpty } = require('lodash')

existOrExit(
  user_tpl_json_path,
  '找不到 template.json 文件，请确保在项目根目录运行此命令！'
)

const pages = require(user_tpl_json_path).pages

module.exports = async () => {
  logger.success('Page List：')
  if (isEmpty(pages)) {
    return console.log('列表为空')
  }
  pages.forEach(item => {
    console.log(`=>`, item)
  })
}
