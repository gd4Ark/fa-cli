const exec = require('child_process').execSync

export default () => {
  let name: string
  let email: string

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) {
    return ''
  }

  name = JSON.stringify(name.toString().trim()).slice(1, -1)
  email = ` <${email.toString().trim()}>`
  return (name || '') + (email || '')
}
