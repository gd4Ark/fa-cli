"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var system_1 = require("../../utils/system");
var logger_1 = require("../../utils/logger");
var config_1 = require("../../config");
require('module-alias/register');
var isEmpty = require('lodash').isEmpty;
exports.default = (function () {
    system_1.existOrExit(config_1.user_tpl_json_path, 'The template.json file could not be found, please make sure to run this command in the project root directory!');
    var pages = require(config_1.user_tpl_json_path).pages;
    logger_1.default.success('Page List：');
    if (isEmpty(pages)) {
        return console.log('list is empty');
    }
    pages.forEach(function (item) {
        console.log("=>", item);
    });
});
//# sourceMappingURL=page.js.map