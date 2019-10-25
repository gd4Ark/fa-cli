const path = require('path')
const home = require('user-home')
const pgk = require('../package.json')
const ORG_NAME = 'fa-web-template'

export const PRO_NAME: string = pgk.name

export const ROOT_PATH: string = path.join(__dirname, '../')

export const TPL_PATH: string = path.join(home, `.${ORG_NAME}`)

export const USER_PATH: string = process.cwd()

export const USER_TPL_JSON_PATH: string = `${process.cwd()}/template.json`

export const GIT_TPL_LIST_URL: string = `https://api.github.com/orgs/${ORG_NAME}/repos`

export const GIT_REPO_DEFAULT_BRANCH: string = 'master'

export const CLI_TAG_URL: string = 'https://registry.npm.taobao.org/fa-cli'
