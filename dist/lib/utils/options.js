"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_git_user_1 = require("./get-git-user");
var _a = require('path'), join = _a.join, resolve = _a.resolve;
var exist = require('fs').existsSync;
var metadata = require('read-metadata');
var validateName = require('validate-npm-package-name');
exports.default = (function (name, dir) {
    var opt = getMetadata(dir);
    setDefault(opt, 'name', name);
    setValidateName(opt);
    var author = get_git_user_1.default();
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
//# sourceMappingURL=options.js.map