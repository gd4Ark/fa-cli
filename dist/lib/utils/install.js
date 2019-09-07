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
var options_1 = require("./options");
var ask_1 = require("./ask");
var join = require('path').join;
var async = require('async');
var chalk = require('chalk');
var render = require('consolidate').handlebars.render;
var Metalsmith = require('metalsmith');
var Handlebars = require('handlebars');
Handlebars.registerHelper('if_eq', function (a, b, opts) {
    a === b ? opts.fn(this) : opts.inverse(this);
});
var askQuestions = function (prompts) {
    return function (files, metalsmith, done) {
        ask_1.default(prompts, metalsmith.metadata(), done);
    };
};
var renderTemplateFiles = function () {
    return function (files, metalsmith, done) {
        var keys = Object.keys(files);
        var data = metalsmith.metadata();
        async.each(keys, function (key, next) {
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
exports.default = (function (_a) {
    var name = _a.name, src = _a.src, dest = _a.dest;
    return __awaiter(void 0, void 0, void 0, function () {
        var opts, metalsmith, data;
        return __generator(this, function (_b) {
            opts = options_1.default(name, src);
            metalsmith = Metalsmith(join(src, 'template'));
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
                            var helpers = { chalk: chalk, files: files };
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
//# sourceMappingURL=install.js.map