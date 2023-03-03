import { inject, injectable } from 'inversify';

import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

import { AuthGuard } from '~/auth';
import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';

import 'reflect-metadata';

enum RoutePath {
  INFO = '/accountInfo',
  GET_ALL_ACCOUNTS = '/getAllAccounts',
  CREATE_ACCOUNT = '/createAccount'
}

@injectable()
export class AccountController extends BaseController {
  readonly moduleName = 'AccountController';
  constructor (
    @inject(Modules.Logger) private readonly loggerService: Logger,
    @inject(Modules.AccountService) private readonly accountService: AccountService,
    @inject(Modules.AuthGuard) private readonly authGuard: AuthGuard) {
    super(loggerService);
  }

  getInfo: ControllerHandler = (req, res) => {
    const info = this.accountService.getInfo();
    this.loggerService.requestInfo(req, req.params, this.moduleName);
    const response = { info };
    res.json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  getAllAccounts: ControllerHandler = async (req, res) => {
    const { user } = req;
    this.loggerService.requestInfo(req, user, this.moduleName);
    const accountList = await this.accountService.getAllAccounts(user.id);
    const response = { accountList, user };
    res.json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  createAccount: ControllerHandler = async (req, res) => {
    const { user, body } = req;
    this.loggerService.requestInfo(req, { user, body }, this.moduleName);
    const account = await this.accountService.createAccount(user.id, body as CreateAccountDto);
    const response = { user, account };
    res.status(201).json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  getRoutes (): Route[] {
    return [
      { method: 'get', path: RoutePath.INFO, cb: this.getInfo },
      { method: 'get', path: RoutePath.GET_ALL_ACCOUNTS, cb: this.getAllAccounts, middleware: [this.authGuard] },
      { method: 'post', path: RoutePath.CREATE_ACCOUNT, cb: this.createAccount, middleware: [new ValidateMiddleware(CreateAccountDto), this.authGuard] }
    ];
  }
}
