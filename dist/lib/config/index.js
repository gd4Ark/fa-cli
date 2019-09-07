"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
var path = require('path');
var home = require('user-home');
var pgk = require('~/package.json');
var org_name = 'fa-web-template';
exports.pro_name = pgk.name;
exports.root_path = path.join(__dirname, '../');
exports.tpl_path = path.join(home, "." + org_name);
exports.user_path = process.cwd();
exports.user_tpl_json_path = process.cwd() + "/template.json";
exports.git_tpl_list_url = "https://api.github.com/orgs/" + org_name + "/repos";
exports.git_repo_default_branch = 'master';
exports.cli_tag_url = 'https://registry.npm.taobao.org/fa-cli';
//# sourceMappingURL=index.js.map