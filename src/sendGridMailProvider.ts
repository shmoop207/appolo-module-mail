"use strict";
import {IMailProvider} from "./IMailProvider";
import {define, init, singleton, inject} from "@appolo/inject";
import {IMailOptions, IOptions} from "./IOptions";
import {IEnv} from "../config/env/IEnv";
import {ILogger} from "@appolo/logger";
import {Arrays} from "@appolo/utils";
import sendgrid = require('@sendgrid/mail');


@define()
@singleton()
export class SendGridMailProvider implements IMailProvider {

    private _apiKey: string;

    @inject() protected moduleOptions: IOptions;
    @inject() protected env: IEnv;
    @inject() protected logger: ILogger;


    @init()
    private initialize() {
        this._apiKey = this.moduleOptions.apiKey || this.env.mailSenderApiKey;
        sendgrid.setApiKey(this._apiKey);
    }

    public async send({from, fromName, to, subject, body, attachments = [], bcc = [], cc = [], sendMultiple = true}: IMailOptions) {

        try {
            let tos = Arrays.compact(Array.isArray(to) ? to : [to]),
                bccs = Arrays.compact(Array.isArray(bcc) ? bcc : [bcc]),
                ccs = Arrays.compact(Array.isArray(cc) ? cc : [cc]),
                attachmentsDto = Arrays.compact(Array.isArray(attachments) ? attachments : [attachments]);

            let msg = <any>{
                to: tos,
                bcc: bccs,
                cc: ccs,
                from: {name: fromName, email: from},
                subject: subject,
                html: body,
            };

            if (attachmentsDto && attachmentsDto.length) {
                msg.attachments = [];

                attachmentsDto.forEach( attachment => {
                    msg.attachments.push({
                        content: attachment.content,
                        filename: attachment.fileName,
                        type: attachment.type
                    });
                });
            }

            if (sendMultiple) {
                await sendgrid.sendMultiple(msg);
            } else {
                await sendgrid.send(msg);
            }

        } catch (e) {
            this.logger.error("failed to mail", {from, to, subject, e: e});
            throw e;
        }
    }

}
