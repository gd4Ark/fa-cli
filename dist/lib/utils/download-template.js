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
var config_1 = require("../config");
var get_template_list_1 = require("./get-template-list");
var logger_1 = require("./logger");
var ora = require('ora');
var path = require('path');
var download = require('download-git-repo');
var inquirer = require('inquirer');
var rmSync = require('rimraf').sync;
var existsSync = require('fs').existsSync;
var getQuestions = function (choices) {
    return [
        {
            type: 'list',
            name: 'name',
            message: 'choose a template',
            choices: choices
        },
        {
            type: 'input',
            name: 'branch',
            message: 'use branch',
            default: config_1.git_repo_default_branch
        }
    ];
};
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var tpls, choices, questions, _a, name, branch, place, tpl, res, spinner;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, get_template_list_1.default()];
            case 1:
                tpls = _b.sent();
                choices = Object.keys(tpls);
                questions = getQuestions(choices);
                return [4 /*yield*/, inquirer.prompt(questions)];
            case 2:
                _a = _b.sent(), name = _a.name, branch = _a.branch;
                place = tpls[name]['owner/name'];
                tpl = path.join(config_1.tpl_path, name);
                res = { name: name, tpl: tpl };
                spinner = ora('download...');
                spinner.start();
                if (existsSync(tpl))
                    rmSync(tpl);
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        download(place + "#" + branch, tpl, { clone: false }, function (err) {
                            spinner.stop();
                            if (err)
                                return logger_1.default.fatal(err);
                            resolve(res);
                        });
                    })];
        }
    });
}); });
//# sourceMappingURL=download-template.js.map