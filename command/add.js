const addActions = require('../lib/add')

module.exports = type => {
    if (!addActions[type]) return console.log(`没有这个类型：${type}`)
    return addActions[type]()
}
