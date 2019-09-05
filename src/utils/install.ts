import { installParameter, installOptions, obj } from '../types/'
import getOptions from './options'
import ask from './ask'
const { join } = require('path')
const async = require('async')
const chalk = require('chalk')
const { render } = require('consolidate').handlebars
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

Handlebars.registerHelper('if_eq', function(this: any, a: string, b: string, opts: any) {
  a === b ? opts.fn(this) : opts.inverse(this)
})

const askQuestions = (prompts: object) => {
  return (files: any, metalsmith: any, done: any) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

const renderTemplateFiles = () => {
  return (files: any, metalsmith: any, done: any) => {
    const keys = Object.keys(files)
    const data = metalsmith.metadata()
    async.each(
      keys,
      (key: number | string, next: any) => {
        const str = files[key].contents.toString()
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next()
        }
        render(str, data, (err: any, res: any) => {
          if (err) {
            err.message = `[${key}] ${err.message}`
            return next(err)
          }
          if (key === '.easy-mock.js' && !data.easymock) {
            delete files[key]
            delete data.easymock
          } else {
            files[key].contents = Buffer.from(res)
          }
          next()
        })
      },
      done
    )
  }
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage(message: string, data: obj) {
  if (!message) return
  render(message, data, (err: any, res: string) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log(
        '\n' +
          res
            .split(/\r?\n/g)
            .map(line => '   ' + line)
            .join('\n')
      )
    }
  })
}

export default async ({ name, src, dest }: installParameter): Promise<any> => {
  const opts: installOptions = getOptions(name, src)
  const metalsmith = Metalsmith(join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd()
  })

  metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles())

  return new Promise((resolve, reject) => {
    metalsmith
      .clean(false)
      .source('.')
      .destination(dest)
      .build((err: any, files: any) => {
        resolve(err)
        if (typeof opts.complete === 'function') {
          const helpers = { chalk, files }
          opts.complete(data, helpers)
        } else {
          logMessage(opts.completeMessage, data)
        }
      })
  })
}
