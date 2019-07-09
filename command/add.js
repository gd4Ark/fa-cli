const actions = require('../lib/add_actions')

module.exports = type => {
    if (!actions[type]) return console.log(`没有这个类型：${type}`)
    return actions[type]()
}
