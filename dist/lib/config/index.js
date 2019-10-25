"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var home = require('user-home');
var pgk = require('../package.json');
var ORG_NAME = 'fa-web-template';
exports.PRO_NAME = pgk.name;
exports.ROOT_PATH = path.join(__dirname, '../');
exports.TPL_PATH = path.join(home, "." + ORG_NAME);
exports.USER_PATH = process.cwd();
exports.USER_TPL_JSON_PATH = process.cwd() + "/template.json";
exports.GIT_TPL_LIST_URL = "https://api.github.com/orgs/" + ORG_NAME + "/repos";
exports.GIT_REPO_DEFAULT_BRANCH = 'master';
exports.CLI_TAG_URL = 'https://registry.npm.taobao.org/fa-cli';
//# sourceMappingURL=index.js.map