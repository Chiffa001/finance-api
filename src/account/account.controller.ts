import { inject, injectable } from 'inversify';

import { AccountService } from './account.service';

import { BaseController } from '~/common/base-controller';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';
import 'reflect-metadata';

enum RoutePath {
  INFO = '/accountInfo',
}

@injectable()
export class AccountController extends BaseController {
  constructor (
    @inject(Modules.Logger) private readonly loggerService: Logger,
    @inject(Modules.AccountService) private readonly accountService: AccountService) {
    super(loggerService);
  }

  getInfo: ControllerHandler = (req, res) => {
    const info = this.accountService.getInfo();
    this.loggerService.info(`${RoutePath.INFO}: ${JSON.stringify({ res: { info } })}`);
    res.json({ info });
  };

  getRoutes (): Route[] {
    return [
      { method: 'get', path: RoutePath.INFO, cb: this.getInfo }
    ];
  }
}
