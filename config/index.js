const path = require('path')
const home = require('user-home')
module.exports = {
    root_path: path.join(__dirname, '../'),
    template_path: path.join(home, '.ed-web-template'),
    user_path: process.cwd(),
    template_json_path: `${process.cwd()}/template.json`,
    template_list_url: 'https://api.github.com/orgs/ed-web-template/repos'
}
