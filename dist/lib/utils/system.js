"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var existsSync = require('fs').existsSync;
exports.exit = function (message) {
    if (message === void 0) { message = 'system interruption'; }
    logger_1.default.fatal(message);
    process.exit();
};
exports.existOrExit = function (path, message) {
    if (message === void 0) { message = 'file not found'; }
    if (!existsSync(path)) {
        exports.exit(message);
    }
};
//# sourceMappingURL=system.js.map