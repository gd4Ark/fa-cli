require('module-alias/register')
const path = require('path')
const home = require('user-home')
const pgk = require('@/package')
const org_name = 'fa-web-template'
module.exports = {
  pro_name: pgk.name,
  root_path: path.join(__dirname, '../'),
  tpl_path: path.join(home, `.${org_name}`),
  user_path: process.cwd(),
  user_tpl_json_path: `${process.cwd()}/template.json`,
  git_tpl_list_url: `https://api.github.com/orgs/${org_name}/repos`,
  git_repo_default_branch: 'master',
  cli_tag_url: 'https://registry.npm.taobao.org/fa-cli'
}
