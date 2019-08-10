require('module-alias/register')
const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('@/package.json')
const { cli_tag_url, pro_name } = require('@/config')
module.exports = done => {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(
      chalk.red(
        `  You must upgrade node to >=${
          packageConfig.engines.node
        }.x to use vue-cli`
      )
    )
  }

  request(
    {
      url: cli_tag_url,
      timeout: 1000
    },
    (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const data = JSON.parse(body)['dist-tags']
        const version = data.latest
        const localVersion = packageConfig.version
        if (semver.lt(localVersion, version)) {
          console.log(chalk.yellow(` ${pro_name} 有一个新版本更新！！！`))
          console.log('  latest:    ' + chalk.green(version))
          console.log('  installed: ' + chalk.red(localVersion))
        }
      }
      done()
    }
  )
}
