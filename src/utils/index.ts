import { initAnswer } from '../types'
import logger from './logger'
const assert = require('assert')
const mkdirp = require('mkdirp')
const rm = require('rimraf')
const fs = require('fs')
const path = require('path')
const existsSync = fs.existsSync
const readFileSync = fs.readFileSync
const Handlebars = require('handlebars')
const upperFirst = require('lodash/upperFirst')

Handlebars.registerHelper('upperFirst', upperFirst)

export const writeFile = (filePath: string, contents: string, cb: any): void => {
  mkdirp(path.dirname(filePath), (err: any) => {
    if (err) return console.error(`${filePath} creation failed，${err}`)
    fs.writeFile(filePath, contents, cb)
  })
}

export const getTemplte = (filePath: string) => {
  assert(existsSync(filePath), `getTemplate: file ${filePath} not fould`)
  const source = readFileSync(filePath, 'utf-8')
  return Handlebars.compile(source)
}

export const generate = (files: any[], answers: any) => {
  return new Promise((resolve, reject) => {
    const len = files.length
    let count = 0
    files.forEach(item => {
      const contents = getTemplte(item.from)(answers)
      writeFile(item.to, contents, (err: any) => {
        if (err) reject(err)
        count++
        if (count === len) {
          resolve()
        }
      })
    })
  })
}

export const deleteFiles = (files: any[]) => {
  return new Promise((resolve, reject) => {
    const len = files.length
    let count = 0
    files.forEach(item => {
      rm(item.path, (err: any) => {
        if (err) logger.fatal('failed', err)
        count++
        if (count === len) {
          resolve()
        }
      })
    })
  })
}

export default {
  getTemplte,
  generate,
  deleteFiles
}
