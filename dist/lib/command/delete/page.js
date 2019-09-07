"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var system_1 = require("../../utils/system");
var logger_1 = require("../../utils/logger");
var utils_1 = require("../../utils");
var config_1 = require("../../config");
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var fs, join, prompt, ora, template, template_name, generator_path, _a, questions, getTemplates, answers, files, spinner;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                system_1.existOrExit(config_1.user_tpl_json_path, 'The template.json file could not be found, please make sure to run this command in the project root directory!');
                fs = require('fs');
                join = require('path').join;
                prompt = require('inquirer').prompt;
                ora = require('ora');
                template = require(config_1.user_tpl_json_path);
                template_name = template.name;
                generator_path = join(config_1.tpl_path, template_name + "/generator");
                _a = require(join(generator_path, 'command/delete/page.js')), questions = _a.questions, getTemplates = _a.getTemplates;
                return [4 /*yield*/, prompt(questions)];
            case 1:
                answers = _b.sent();
                files = getTemplates(answers, config_1.user_path);
                spinner = ora('deleting Page ...');
                spinner.start();
                return [4 /*yield*/, utils_1.deleteFiles(files)];
            case 2:
                _b.sent();
                template.pages = template.pages.filter(function (item) {
                    if (item.name !== answers.name) {
                        return item;
                    }
                    return null;
                });
                fs.writeFile(config_1.user_tpl_json_path, JSON.stringify(template), function (err) {
                    if (err)
                        logger_1.default.fatal('delete fail', err);
                    spinner.stop();
                    logger_1.default.success("delete page " + answers.name + " successfully");
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=page.js.map