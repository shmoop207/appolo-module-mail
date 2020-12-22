import {IMailOptions} from "./IOptions";

export interface IMailProvider {
    send({from, fromName, to, subject, body, attachments, bcc}: IMailOptions)

}