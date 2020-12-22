"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject'
import {IMailProvider} from "./IMailProvider";
import {SendGridMailProvider} from "./sendGridMailProvider";

@define()
@singleton()
@factory()
export class MailProvider implements IFactory<IMailProvider> {

    @inject() sendGridMailProvider: SendGridMailProvider;

    public async get(): Promise<IMailProvider> {

        return this.sendGridMailProvider;
    }

}
