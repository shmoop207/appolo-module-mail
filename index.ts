"use strict";
import {Module, module,IModuleParams} from '@appolo/engine';
import {MailProvider} from "./src/mailProvider";
import {IOptions} from "./src/IOptions";

export {IOptions, IMailOptions, MailAttachment}  from "./src/IOptions"
export {IMailProvider}  from "./src/IMailProvider"

@module()
export class MailModule extends Module<IOptions> {


    protected readonly Defaults: Partial<IOptions> = {
        id: "mailProvider"
    };

    public static for(options?:IOptions):IModuleParams{
        return {type:MailModule,options}
    }

    public get exports() {
        return [{id: this.moduleOptions.id, type: MailProvider}]
    }

}
