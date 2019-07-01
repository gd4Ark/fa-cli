const addActions = require('../lib/add')

module.exports = type => {
    return addActions[type]()
}
