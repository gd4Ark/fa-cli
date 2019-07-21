const actions = ['page']

module.exports = type => {
    if (!actions.includes(type)) return console.log(`没有这个类型：${type}`)
    require(`./${type}`)()
}
