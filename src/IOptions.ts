

export interface IOptions  {
    id?: string;
    apiKey?: string;
}

export interface MailAttachment {
    fileName: string,
    content: string,
    type: string
}

export interface IMailOptions {
    from: string;
    fromName: string;
    to: string | string[];
    subject: string;
    body: string;
    bcc?: string | string[];
    attachments?: MailAttachment | MailAttachment[];
    sendMultiple?: boolean;
}
