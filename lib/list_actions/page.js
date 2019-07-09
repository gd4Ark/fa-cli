const logger = require('../utils/logger')
const { template_json_path } = require('../../config')

const pages = require(template_json_path).pages

module.exports = async() => {
    logger.success('页面列表：')
    pages.map(item => {
        console.log(`=>`, item)
    })
}
