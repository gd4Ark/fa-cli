const path = require('path')
const home = require('user-home')
const pgk = require('../package.json')
const org_name = 'fa-web-template'

export const pro_name: string = pgk.name

export const root_path: string = path.join(__dirname, '../')

export const tpl_path: string = path.join(home, `.${org_name}`)

export const user_path: string = process.cwd()

export const user_tpl_json_path: string = `${process.cwd()}/template.json`

export const git_tpl_list_url: string = `https://api.github.com/orgs/${org_name}/repos`

export const git_repo_default_branch: string = 'master'

export const cli_tag_url: string = 'https://registry.npm.taobao.org/fa-cli'
