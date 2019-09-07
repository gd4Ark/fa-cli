"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var assert = require('assert');
var mkdirp = require('mkdirp');
var rm = require('rimraf');
var fs = require('fs');
var path = require('path');
var existsSync = fs.existsSync;
var readFileSync = fs.readFileSync;
var Handlebars = require('handlebars');
var upperFirst = require('lodash/upperFirst');
Handlebars.registerHelper('upperFirst', upperFirst);
exports.writeFile = function (filePath, contents, cb) {
    mkdirp(path.dirname(filePath), function (err) {
        if (err)
            return console.error(filePath + " creation failed\uFF0C" + err);
        fs.writeFile(filePath, contents, cb);
    });
};
exports.getTemplte = function (filePath) {
    assert(existsSync(filePath), "getTemplate: file " + filePath + " not fould");
    var source = readFileSync(filePath, 'utf-8');
    return Handlebars.compile(source);
};
exports.generate = function (files, answers) {
    return new Promise(function (resolve, reject) {
        var len = files.length;
        var count = 0;
        files.forEach(function (item) {
            var contents = exports.getTemplte(item.from)(answers);
            exports.writeFile(item.to, contents, function (err) {
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
exports.deleteFiles = function (files) {
    return new Promise(function (resolve, reject) {
        var len = files.length;
        var count = 0;
        files.forEach(function (item) {
            rm(item.path, function (err) {
                if (err)
                    logger_1.default.fatal('failed', err);
                count++;
                if (count === len) {
                    resolve();
                }
            });
        });
    });
};
exports.default = {
    getTemplte: exports.getTemplte,
    generate: exports.generate,
    deleteFiles: exports.deleteFiles
};
//# sourceMappingURL=index.js.map