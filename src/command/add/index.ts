const actions = ['page']
import page from './page'

export default (type: string): void => {
  if (!actions.includes(type)) return console.log(`type not found：${type}`)
  page()
}
