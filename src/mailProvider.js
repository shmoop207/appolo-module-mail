"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let MailProvider = class MailProvider {
    async get() {
        return this.sendGridMailProvider;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], MailProvider.prototype, "sendGridMailProvider", void 0);
MailProvider = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], MailProvider);
exports.MailProvider = MailProvider;
//# sourceMappingURL=mailProvider.js.map