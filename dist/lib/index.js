"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./command/index");
exports.default = (function () {
    var program = require('commander');
    program.version(require('../package').version).usage('<command> [options]');
    program
        .command('init [project-name]')
        .description('Initialize a project')
        .alias('i')
        .action(function (project) {
        if (project === void 0) { project = '.'; }
        index_1.default.init(project);
    });
    program
        .command('download')
        .description('Download project template')
        .alias('load')
        .action(function () {
        index_1.default.download().catch(console.error);
    });
    program
        .command('add [type]')
        .description('Add, optional [page], default is page')
        .alias('a')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        index_1.default.add(type);
    });
    program
        .command('delete [type]')
        .description('Delete, optional [page], default to page.')
        .alias('d')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        index_1.default.delete(type);
    });
    program
        .command('list [type]')
        .description('List, optional [page], default is page')
        .alias('l')
        .action(function (type) {
        if (type === void 0) { type = 'page'; }
        index_1.default.list(type);
    });
    program.parse(process.argv);
    if (!program.args.length) {
        program.help();
    }
});
//# sourceMappingURL=index.js.map