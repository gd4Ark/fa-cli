"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var prompt = require('inquirer').prompt;
exports.default = (function (prompts, data, done) {
    async.eachSeries(Object.keys(prompts), function (key, next) {
        promptFn(data, key, prompts[key], next);
    }, done);
});
var promptFn = function (data, key, promptData, done) {
    promptsFn(key, promptData, function (answers) {
        var answer = answers[key];
        if (promptData.children && answer) {
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
//# sourceMappingURL=ask.js.map