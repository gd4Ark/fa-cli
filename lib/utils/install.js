const { join } = require('path')
const async = require('async')
const chalk = require('chalk')
const { render } = require('consolidate').handlebars
const getOptions = require('./options')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const ask = require('./ask')

Handlebars.registerHelper('if_eq', (a, b, opts) =>
  a === b ? opts.fn(this) : opts.inverse(this)
)

module.exports = (name, src, dest, done) => {
  const opts = getOptions(name, src)
  const metalsmith = Metalsmith(join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd()
  })
  metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles())
  metalsmith
    .clean(false)
    .source('.')
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, files }
        opts.complete(data, helpers)
      } else {
        logMessage(opts.completeMessage, data)
      }
    })
  return data
}

const askQuestions = prompts => {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

const renderTemplateFiles = () => {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    const data = metalsmith.metadata()
    async.each(
      keys,
      (key, next) => {
        const str = files[key].contents.toString()
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next()
        }
        render(str, data, (err, res) => {
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

function logMessage(message, data) {
  if (!message) return
  render(message, data, (err, res) => {
    if (err) {
      console.error(
        '\n   Error when rendering template complete message: ' +
                    err.message.trim()
      )
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
