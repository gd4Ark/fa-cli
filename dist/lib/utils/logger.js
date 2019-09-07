"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
var chalk = require('chalk');
var format = require('util').format;
/**
 * Prefix.
 */
var prefix = "  " + require('~/package.json').name;
var sep = chalk.gray('·');
/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
exports.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = format.apply(format, args);
    console.log(chalk.white(prefix), sep, msg);
};
/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
exports.fatal = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[0] instanceof Error)
        args[0] = args[0].message.trim();
    var msg = format.apply(format, args);
    console.error(chalk.red(prefix), sep, msg);
    process.exit(1);
};
/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
exports.success = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = format.apply(format, args);
    console.log(chalk.white(prefix), sep, msg);
};
exports.default = {
    log: exports.log,
    fatal: exports.fatal,
    success: exports.success
};
//# sourceMappingURL=logger.js.map