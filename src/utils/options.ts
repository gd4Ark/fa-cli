import { obj, installOptions } from '../types'
import getGitUser from './get-git-user'
const { join, resolve } = require('path')
const { existsSync: exist } = require('fs')
const metadata = require('read-metadata')
const validateName = require('validate-npm-package-name')

export default (name: string, dir: string): installOptions => {
  const opt: installOptions = getMetadata(dir)
  setDefault(opt, 'name', name)
  setValidateName(opt)
  const author = getGitUser()
  if (author) {
    setDefault(opt, 'author', author)
  }
  return opt
}

const getMetadata = (dir: string): installOptions => {
  const json: string = join(dir, 'meta.json')
  const js: string = join(dir, 'meta.js')
  let opt = {} as installOptions
  if (exist(json)) {
    opt = metadata.sync(json)
  } else if (exist(js)) {
    const req = require(resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to return an object')
    }
    opt = req
  }
  return opt
}

const setDefault = (opt: installOptions, key: string, val: string) => {
  const prompts: obj = opt.prompts || (opt.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName(opts: installOptions) {
  const name: obj = opts.prompts.name
  const customValidate = name.validate
  name.validate = (name: string) => {
    const its = validateName(name)
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || [])
      return 'Sorry, ' + errors.join(' and ') + '.'
    }
    if (typeof customValidate === 'function') return customValidate(name)
    return true
  }
}
