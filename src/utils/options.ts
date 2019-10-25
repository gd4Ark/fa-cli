import { Obj, InstallOptions } from '../types'
import getGitUser from './get-git-user'
const { join, resolve } = require('path')
const { existsSync: exist } = require('fs')
const metadata = require('read-metadata')
const validateName = require('validate-npm-package-name')

export default (name: string, dir: string): InstallOptions => {
  const opt: InstallOptions = getMetadata(dir)
  setDefault(opt, 'name', name)
  setValidateName(opt)
  const author = getGitUser()
  if (author) {
    setDefault(opt, 'author', author)
  }
  return opt
}

const getMetadata = (dir: string): InstallOptions => {
  const json: string = join(dir, 'meta.json')
  const js: string = join(dir, 'meta.js')
  let opt = {} as InstallOptions
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

const setDefault = (opt: InstallOptions, key: string, val: string): void => {
  const prompts: Obj = opt.prompts || (opt.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName(opts: InstallOptions): void {
  const name: Obj = opts.prompts.name
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
