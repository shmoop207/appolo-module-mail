"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridMailProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const sendgrid = require("@sendgrid/mail");
let SendGridMailProvider = class SendGridMailProvider {
    initialize() {
        this._apiKey = this.moduleOptions.apiKey || this.env.mailSenderApiKey;
        sendgrid.setApiKey(this._apiKey);
    }
    async send({ from, fromName, to, subject, body, attachments = [], bcc = [], cc = [], sendMultiple = true }) {
        try {
            let tos = utils_1.Arrays.compact(Array.isArray(to) ? to : [to]), bccs = utils_1.Arrays.compact(Array.isArray(bcc) ? bcc : [bcc]), ccs = utils_1.Arrays.compact(Array.isArray(cc) ? cc : [cc]), attachmentsDto = utils_1.Arrays.compact(Array.isArray(attachments) ? attachments : [attachments]);
            let msg = {
                to: tos,
                bcc: bccs,
                cc: ccs,
                from: { name: fromName, email: from },
                subject: subject,
                html: body,
            };
            if (attachmentsDto && attachmentsDto.length) {
                msg.attachments = [];
                attachmentsDto.forEach(attachment => {
                    msg.attachments.push({
                        content: attachment.content,
                        filename: attachment.fileName,
                        type: attachment.type
                    });
                });
            }
            if (sendMultiple) {
                await sendgrid.sendMultiple(msg);
            }
            else {
                await sendgrid.send(msg);
            }
        }
        catch (e) {
            this.logger.error("failed to mail", { from, to, subject, e: e });
            throw e;
        }
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], SendGridMailProvider.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], SendGridMailProvider.prototype, "env", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], SendGridMailProvider.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.init)()
], SendGridMailProvider.prototype, "initialize", null);
SendGridMailProvider = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], SendGridMailProvider);
exports.SendGridMailProvider = SendGridMailProvider;
//# sourceMappingURL=sendGridMailProvider.js.map