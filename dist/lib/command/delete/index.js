"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../../utils/logger");
var page_1 = require("./page");
var actions = {
    page: page_1.default
};
exports.default = (function (type) {
    if (actions[type]) {
        page_1.default().catch(console.error);
    }
    else {
        logger_1.default.fatal("type not found\uFF1A" + type);
    }
});
//# sourceMappingURL=index.js.map