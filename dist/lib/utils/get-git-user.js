"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').execSync;
exports.default = (function () {
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
//# sourceMappingURL=get-git-user.js.map