require('module-alias/register');
var path = require('path');
var home = require('user-home');
var pgk = require('~/package.json');
var org_name = 'fa-web-template';
var pro_name = pgk.name;
var root_path = path.join(__dirname, '../');
var tpl_path = path.join(home, "." + org_name);
var user_path = process.cwd();
var user_tpl_json_path = process.cwd() + "/template.json";
var git_tpl_list_url = "https://api.github.com/orgs/" + org_name + "/repos";
var git_repo_default_branch = 'master';
var cli_tag_url = 'https://registry.npm.taobao.org/fa-cli';

require('module-alias/register');
var request = require('request');
var semver = require('semver');
var chalk = require('chalk');
var packageConfig = require('~/package.json');
var checkVersion = (function (done) {
    // Ensure minimum supported node version is used
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red("  You must upgrade node to >=" + packageConfig.engines.node + ".x to use vue-cli"));
    }
    request({
        url: cli_tag_url,
        timeout: 1000
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            var data = JSON.parse(body)['dist-tags'];
            var version = data.latest;
            var localVersion = packageConfig.version;
            if (semver.lt(localVersion, version)) {
                console.log(chalk.yellow(" " + pro_name + " release new version!"));
                console.log('  latest:    ' + chalk.green(version));
                console.log('  installed: ' + chalk.red(localVersion));
            }
        }
        done();
    });
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var request$1 = require('request');
var ora = require('ora');
var templates = null;
var getTemplateList = (function (show) {
    if (show === void 0) { show = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var spinner, headers, handler;
        return __generator(this, function (_a) {
            if (templates)
                return [2 /*return*/, templates];
            spinner = ora('getting template...');
            if (show) {
                spinner.start();
            }
            headers = {
                headers: {
                    'User-Agent': pro_name
                },
                url: git_tpl_list_url
            };
            handler = function (data) {
                var tpls = {};
                data.forEach(function (item) {
                    var name = item.name, html_url = item.html_url, default_branch = item.default_branch;
                    tpls[name] = {
                        'owner/name': html_url.replace('https://github.com/', ''),
                        branch: default_branch
                    };
                });
                return tpls;
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    request$1(headers, function (err, res, body) {
                        spinner.stop();
                        if (err)
                            reject(err);
                        var data = JSON.parse(body);
                        templates = handler(data);
                        resolve(templates);
                    });
                })];
        });
    });
});

require('module-alias/register');
var chalk$1 = require('chalk');
var format = require('util').format;
/**
 * Prefix.
 */
var prefix = "  " + require('~/package.json').name;
var sep = chalk$1.gray('·');
/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = format.apply(format, args);
    console.log(chalk$1.white(prefix), sep, msg);
};
/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
var fatal = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[0] instanceof Error)
        args[0] = args[0].message.trim();
    var msg = format.apply(format, args);
    console.error(chalk$1.red(prefix), sep, msg);
    process.exit(1);
};
/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
var success = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = format.apply(format, args);
    console.log(chalk$1.white(prefix), sep, msg);
};
var logger = {
    log: log,
    fatal: fatal,
    success: success
};

var ora$1 = require('ora');
var path$1 = require('path');
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
            default: git_repo_default_branch
        }
    ];
};
var downloadTemplate = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var tpls, choices, questions, _a, name, branch, place, tpl, res, spinner;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getTemplateList()];
            case 1:
                tpls = _b.sent();
                choices = Object.keys(tpls);
                questions = getQuestions(choices);
                return [4 /*yield*/, inquirer.prompt(questions)];
            case 2:
                _a = _b.sent(), name = _a.name, branch = _a.branch;
                place = tpls[name]['owner/name'];
                tpl = path$1.join(tpl_path, name);
                res = { name: name, tpl: tpl };
                spinner = ora$1('download...');
                spinner.start();
                if (existsSync(tpl))
                    rmSync(tpl);
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        download(place + "#" + branch, tpl, { clone: false }, function (err) {
                            spinner.stop();
                            if (err)
                                return logger.fatal(err);
                            resolve(res);
                        });
                    })];
        }
    });
}); });

var exec = require('child_process').execSync;
var getGitUser = (function () {
    var name;
    var email;
    try {
        name = exec('git config --get user.name');
        email = exec('git config --get user.email');
    }
    catch (e) {
        return '';
    }
    name = JSON.stringify(name.toString().trim()).slice(1, -1);
    email = " <" + email.toString().trim() + ">";
    return (name || '') + (email || '');
});

var _a = require('path'), join = _a.join, resolve = _a.resolve;
var exist = require('fs').existsSync;
var metadata = require('read-metadata');
var validateName = require('validate-npm-package-name');
var getOptions = (function (name, dir) {
    var opt = getMetadata(dir);
    setDefault(opt, 'name', name);
    setValidateName(opt);
    var author = getGitUser();
    if (author) {
        setDefault(opt, 'author', author);
    }
    return opt;
});
var getMetadata = function (dir) {
    var json = join(dir, 'meta.json');
    var js = join(dir, 'meta.js');
    var opt = {};
    if (exist(json)) {
        opt = metadata.sync(json);
    }
    else if (exist(js)) {
        var req = require(resolve(js));
        if (req !== Object(req)) {
            throw new Error('meta.js needs to return an object');
        }
        opt = req;
    }
    return opt;
};
var setDefault = function (opt, key, val) {
    var prompts = opt.prompts || (opt.prompts = {});
    if (!prompts[key] || typeof prompts[key] !== 'object') {
        prompts[key] = {
            type: 'string',
            default: val
        };
    }
    else {
        prompts[key]['default'] = val;
    }
};
function setValidateName(opts) {
    var name = opts.prompts.name;
    var customValidate = name.validate;
    name.validate = function (name) {
        var its = validateName(name);
        if (!its.validForNewPackages) {
            var errors = (its.errors || []).concat(its.warnings || []);
            return 'Sorry, ' + errors.join(' and ') + '.';
        }
        if (typeof customValidate === 'function')
            return customValidate(name);
        return true;
    };
}

var async = require('async');
var prompt = require('inquirer').prompt;
var ask = (function (prompts, data, done) {
    async.eachSeries(Object.keys(prompts), function (key, next) {
        promptFn(data, key, prompts[key], next);
    }, done);
});
var promptFn = function (data, key, promptData, done) {
    promptsFn(key, promptData, function (answers) {
        var answer = answers[key];
        if (promptData.children && !!answer) {
            data[key] = [];
            childrenAsk(data, key, promptData.children, done);
        }
        else {
            if (Array.isArray(answer)) {
                data[key] = {};
                answer.forEach(function (item) {
                    data[key][item] = true;
                });
            }
            else {
                data[key] = answer;
            }
            done();
        }
    });
};
var promptsFn = function (key, promptData, done) {
    var type = promptData.type, message = promptData.message, label = promptData.label, choices = promptData.choices, _a = promptData.validate, validate = _a === void 0 ? function () { return true; } : _a;
    var promptDefault = promptData.default;
    prompt([
        {
            type: type,
            name: key,
            message: message || label || key,
            choices: choices,
            validate: validate,
            default: promptDefault
        }
    ]).then(function (answers) {
        done(answers);
    });
};
var childrenAsk = function (data, key, prompts, done) {
    var temp = {};
    async.eachSeries(Object.keys(prompts), function (key, next) {
        promptsFn(key, prompts[key], function (answers) {
            temp = Object.assign(temp, answers);
            next();
        });
    }, function () {
        prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: '是否继续添加数据：',
                default: false
            }
        ]).then(function (msg) {
            data[key].push(temp);
            if (msg.continue) {
                childrenAsk(data, key, prompts, done);
            }
            else {
                done();
            }
        });
    });
};

var join$1 = require('path').join;
var async$1 = require('async');
var chalk$2 = require('chalk');
var render = require('consolidate').handlebars.render;
var Metalsmith = require('metalsmith');
var Handlebars = require('handlebars');
Handlebars.registerHelper('if_eq', function (a, b, opts) {
    a === b ? opts.fn(this) : opts.inverse(this);
});
var askQuestions = function (prompts) {
    return function (files, metalsmith, done) {
        ask(prompts, metalsmith.metadata(), done);
    };
};
var renderTemplateFiles = function () {
    return function (files, metalsmith, done) {
        var keys = Object.keys(files);
        var data = metalsmith.metadata();
        async$1.each(keys, function (key, next) {
            var str = files[key].contents.toString();
            if (!/{{([^{}]+)}}/g.test(str)) {
                return next();
            }
            render(str, data, function (err, res) {
                if (err) {
                    err.message = "[" + key + "] " + err.message;
                    return next(err);
                }
                if (key === '.easy-mock.js' && !data.easymock) {
                    delete files[key];
                    delete data.easymock;
                }
                else {
                    files[key].contents = Buffer.from(res);
                }
                next();
            });
        }, done);
    };
};
/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */
function logMessage(message, data) {
    if (!message)
        return;
    render(message, data, function (err, res) {
        if (err) {
            console.error('\n   Error when rendering template complete message: ' + err.message.trim());
        }
        else {
            console.log('\n' +
                res
                    .split(/\r?\n/g)
                    .map(function (line) { return '   ' + line; })
                    .join('\n'));
        }
    });
}
var install = (function (_a) {
    var name = _a.name, src = _a.src, dest = _a.dest;
    return __awaiter(void 0, void 0, void 0, function () {
        var opts, metalsmith, data;
        return __generator(this, function (_b) {
            opts = getOptions(name, src);
            metalsmith = Metalsmith(join$1(src, 'template'));
            data = Object.assign(metalsmith.metadata(), {
                destDirName: name,
                inPlace: dest === process.cwd()
            });
            metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles());
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    metalsmith
                        .clean(false)
                        .source('.')
                        .destination(dest)
                        .build(function (err, files) {
                        resolve(err);
                        if (typeof opts.complete === 'function') {
                            var helpers = { chalk: chalk$2, files: files };
                            opts.complete(data, helpers);
                        }
                        else {
                            logMessage(opts.completeMessage, data);
                        }
                    });
                })];
        });
    });
});

require('module-alias/register');
var path$2 = require('path');
var prompt$1 = require('inquirer').prompt;
var existsSync$1 = require('fs').existsSync;
var init = (function (project) {
    var inPlace = project === '.';
    var name = inPlace ? path$2.relative('../', process.cwd()) : project;
    var to = inPlace ? process.cwd() : path$2.resolve(name);
    var needConfrim = inPlace || existsSync$1(to);
    var confirm = function () {
        prompt$1([
            {
                type: 'confirm',
                message: inPlace
                    ? 'Are you sure you want to create a project in the current directory?'
                    : 'The current directory already exists. Do you want to continue?',
                name: 'ok'
            }
        ])
            .then(function (_a) {
            var ok = _a.ok;
            if (ok)
                run(name, to);
        })
            .catch(logger.fatal);
    };
    needConfrim ? confirm() : run(name, to);
});
var run = function (project, to) { return __awaiter(void 0, void 0, void 0, function () {
    var tpl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, downloadTemplate()];
            case 1:
                tpl = (_a.sent()).tpl;
                install({ name: project, src: tpl, dest: to }).catch(logger.fatal);
                return [2 /*return*/];
        }
    });
}); };

var existsSync$2 = require('fs').existsSync;
var exit = function (message) {
    if (message === void 0) { message = 'system interruption'; }
    logger.fatal(message);
    process.exit();
};
var existOrExit = function (path, message) {
    if (message === void 0) { message = 'file not found'; }
    if (!existsSync$2(path)) {
        exit(message);
    }
};

require('module-alias/register');
var isEmpty = require('lodash').isEmpty;
var page = (function () {
    existOrExit(user_tpl_json_path, 'The template.json file could not be found, please make sure to run this command in the project root directory!');
    var pages = require(user_tpl_json_path).pages;
    logger.success('Page List：');
    if (isEmpty(pages)) {
        return console.log('list is empty');
    }
    pages.forEach(function (item) {
        console.log("=>", item);
    });
});

var actions = ['page'];
var list = (function (type) {
    if (!actions.includes(type))
        return console.log("type not found\uFF1A" + type);
    page();
});

var download$1 = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, downloadTemplate()];
            case 1:
                name = (_a.sent()).name;
                logger.success("download successful");
                return [2 /*return*/];
        }
    });
}); });

var assert = require('assert');
var mkdirp = require('mkdirp');
var rm = require('rimraf');
var fs = require('fs');
var path$3 = require('path');
var existsSync$3 = fs.existsSync;
var readFileSync = fs.readFileSync;
var Handlebars$1 = require('handlebars');
var upperFirst = require('lodash/upperFirst');
Handlebars$1.registerHelper('upperFirst', upperFirst);
var writeFile = function (filePath, contents, cb) {
    mkdirp(path$3.dirname(filePath), function (err) {
        if (err)
            return console.error(filePath + " creation failed\uFF0C" + err);
        fs.writeFile(filePath, contents, cb);
    });
};
var getTemplte = function (filePath) {
    assert(existsSync$3(filePath), "getTemplate: file " + filePath + " not fould");
    var source = readFileSync(filePath, 'utf-8');
    return Handlebars$1.compile(source);
};
var generate = function (files, answers) {
    return new Promise(function (resolve, reject) {
        var len = files.length;
        var count = 0;
        files.forEach(function (item) {
            var contents = getTemplte(item.from)(answers);
            writeFile(item.to, contents, function (err) {
                if (err)
                    reject(err);
                count++;
                if (count === len) {
                    resolve();
                }
            });
        });
    });
};
var deleteFiles = function (files) {
    return new Promise(function (resolve, reject) {
        var len = files.length;
        var count = 0;
        files.forEach(function (item) {
            rm(item.path, function (err) {
                if (err)
                    logger.fatal('failed', err);
                count++;
                if (count === len) {
                    resolve();
                }
            });
        });
    });
};

var page$1 = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var ora, writeFile$$1, join, prompt, templte, template_name, generator_path, _a, getQuestions, getTemplates, questions, answers, files, spinner;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                existOrExit(user_tpl_json_path, 'The template.json file could not be found, please make sure to run this command in the project root directory!');
                ora = require('ora');
                writeFile$$1 = require('fs').writeFile;
                join = require('path').join;
                prompt = require('inquirer').prompt;
                templte = require(user_tpl_json_path);
                template_name = templte.name;
                generator_path = join(tpl_path, template_name + "/generator");
                _a = require(join(generator_path, 'command/add/page.js')), getQuestions = _a.getQuestions, getTemplates = _a.getTemplates;
                questions = getQuestions(user_path);
                return [4 /*yield*/, prompt(questions)];
            case 1:
                answers = _b.sent();
                files = getTemplates(answers, user_path);
                spinner = ora('creating page...');
                spinner.start();
                return [4 /*yield*/, generate(files, answers)];
            case 2:
                _b.sent();
                templte.pages.push(answers);
                writeFile$$1(user_tpl_json_path, JSON.stringify(templte), function (err) {
                    if (err)
                        logger.fatal('failed to create page：', err);
                    spinner.stop();
                    logger.success("create page " + answers.name + " successfully");
                });
                return [2 /*return*/];
        }
    });
}); });

var actions$1 = ['page'];
var add = (function (type) {
    if (!actions$1.includes(type))
        return console.log("type not found\uFF1A" + type);
    page$1();
});

var page$2 = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var fs, join, prompt, ora, template, template_name, generator_path, _a, questions, getTemplates, answers, files, spinner;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                existOrExit(user_tpl_json_path, 'The template.json file could not be found, please make sure to run this command in the project root directory!');
                fs = require('fs');
                join = require('path').join;
                prompt = require('inquirer').prompt;
                ora = require('ora');
                template = require(user_tpl_json_path);
                template_name = template.name;
                generator_path = join(tpl_path, template_name + "/generator");
                _a = require(join(generator_path, 'command/delete/page.js')), questions = _a.questions, getTemplates = _a.getTemplates;
                return [4 /*yield*/, prompt(questions)];
            case 1:
                answers = _b.sent();
                files = getTemplates(answers, user_path);
                spinner = ora('deleting Page ...');
                spinner.start();
                return [4 /*yield*/, deleteFiles(files)];
            case 2:
                _b.sent();
                template.pages = template.pages.filter(function (item) {
                    if (item.name !== answers.name) {
                        return item;
                    }
                    return null;
                });
                fs.writeFile(user_tpl_json_path, JSON.stringify(template), function (err) {
                    if (err)
                        logger.fatal('delete fail', err);
                    spinner.stop();
                    logger.success("delete page " + answers.name + " successfully");
                });
                return [2 /*return*/];
        }
    });
}); });

var actions$2 = ['page'];
var remove = (function (type) {
    if (!actions$2.includes(type))
        return console.log("type not found\uFF1A" + type);
    page$2();
});

var command = {
    init: init,
    list: list,
    download: download$1,
    add: add,
    delete: remove
};

var app = (function () {
    var program = require('commander');
    program.version(require('../package').version).usage('<command> [options]');
    program
        .command('init [project-name]')
        .description('Initialize a project')
        .alias('i')
        .action(function (project) {
        if (project === void 0) { project = '.'; }
        command.init(project);
    });
    program
        .command('download')
        .description('Download project template')
        .alias('load')
        .action(function () {
        command.download();
    });
    program
        .command('add [type]')
        .description('Add, optional [page], default is page')
        .alias('a')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        command.add(type);
    });
    program
        .command('delete [type]')
        .description('Delete, optional [page], default to page.')
        .alias('d')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        command.delete(type);
    });
    program
        .command('list [type]')
        .description('List, optional [page], default is page')
        .alias('l')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        command.list(type);
    });
    program.parse(process.argv);
    if (!program.args.length) {
        program.help();
    }
});

checkVersion(function () {
    app();
});
//# sourceMappingURL=index.es5.js.map
