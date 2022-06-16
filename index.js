"use strict";
var MailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const mailProvider_1 = require("./src/mailProvider");
let MailModule = MailModule_1 = class MailModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "mailProvider"
        };
    }
    static for(options) {
        return { type: MailModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: mailProvider_1.MailProvider }];
    }
};
MailModule = MailModule_1 = tslib_1.__decorate([
    (0, engine_1.module)()
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=index.js.map