"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions = ['page'];
var page_1 = require("./page");
exports.default = (function (type) {
    if (!actions.includes(type))
        return console.log("type not found\uFF1A" + type);
    page_1.default();
});
//# sourceMappingURL=index.js.map