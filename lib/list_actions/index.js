const actions = ['page']

module.exports = (() => {
    const res = {}
    actions.map(item => {
        res[item] = require(`./${item}`)
    })
    return res
})()
