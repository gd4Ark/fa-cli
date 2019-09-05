require('module-alias/register')
const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix.
 */

const prefix = `  ${require('~/package.json').name}`
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

export const log = (...args: any[]) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

export const fatal = (...args: any[]) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

export const success = (...args: any[]) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

export default {
  log,
  fatal,
  success
}
