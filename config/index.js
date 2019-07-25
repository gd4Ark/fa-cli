const path = require('path')
const home = require('user-home')
const org_name = 'fa-web-template'
module.exports = {
    root_path: path.join(__dirname, '../'),
    template_path: path.join(home, `.${org_name}`),
    user_path: process.cwd(),
    template_json_path: `${process.cwd()}/template.json`,
    template_list_url: `https://api.github.com/orgs/${org_name}/repos`
}
