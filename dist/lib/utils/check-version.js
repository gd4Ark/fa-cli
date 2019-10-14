"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../config/index");
var request = require('request');
var semver = require('semver');
var chalk = require('chalk');
var packageConfig = require('../package.json');
exports.default = (function (done) {
    // Ensure minimum supported node version is used
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red("  You must upgrade node to >=" + packageConfig.engines.node + ".x to use vue-cli"));
    }
    request({
        url: index_1.cli_tag_url,
        timeout: 1000
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            var data = JSON.parse(body)['dist-tags'];
            var version = data.latest;
            var localVersion = packageConfig.version;
            if (semver.lt(localVersion, version)) {
                console.log(chalk.yellow(" " + index_1.pro_name + " release new version!"));
                console.log('  latest:    ' + chalk.green(version));
                console.log('  installed: ' + chalk.red(localVersion));
            }
        }
        done();
    });
});
//# sourceMappingURL=check-version.js.map