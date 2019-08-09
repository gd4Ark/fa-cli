const actions = ['page']

module.exports = type => {
  if (!actions.includes(type)) return console.log(`Type not found：${type}`)
  require(`./${type}`)()
}
