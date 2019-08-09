const { join, resolve } = require('path')
const { existsSync: exist } = require('fs')
const metadata = require('read-metadata')
const getGitUser = require('./get-git-user')
const validateName = require('validate-npm-package-name')

module.exports = (name, dir) => {
  const opt = getMetadata(dir)
  setDefault(opt, 'name', name)
  setValidateName(opt)
  const author = getGitUser()
  if (author) {
    setDefault(opt, 'author', author)
  }
  return opt
}

const getMetadata = dir => {
  const json = join(dir, 'meta.json')
  const js = join(dir, 'meta.js')
  let opt = {}
  if (exist(json)) {
    opt = metadata.sync(json)
  } else if (exist(js)) {
    const req = require(resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js 需要返回一个object')
    }
    opt = req
  }
  return opt
}

const setDefault = (opt, key, val) => {
  const prompts = opt.prompts || (opt.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName(opts) {
  const name = opts.prompts.name
  const customValidate = name.validate
  name.validate = name => {
    const its = validateName(name)
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || [])
      return 'Sorry, ' + errors.join(' and ') + '.'
    }
    if (typeof customValidate === 'function') return customValidate(name)
    return true
  }
}
