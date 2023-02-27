import { inject, injectable } from 'inversify';

import { AccountService } from './account.service';
import { SetInitialSumDto } from './dto/set-initial-sum.dto';

import { AuthGuard } from '~/auth';
import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';

import 'reflect-metadata';

enum RoutePath {
  INFO = '/accountInfo',
  SET_INITIAL_SUM = '/setSum'
}

const MODULE_NAME = 'AccountController';

@injectable()
export class AccountController extends BaseController {
  constructor (
    @inject(Modules.Logger) private readonly loggerService: Logger,
    @inject(Modules.AccountService) private readonly accountService: AccountService,
    @inject(Modules.AuthGuard) private readonly authGuard: AuthGuard) {
    super(loggerService);
  }

  getInfo: ControllerHandler = (req, res) => {
    const info = this.accountService.getInfo();
    this.loggerService.requestInfo(req, req.params, MODULE_NAME);
    const response = { info };
    res.json(response);
    this.loggerService.responseInfo(req, response, MODULE_NAME);
  };

  setInitialAccountSum: ControllerHandler = (req, res) => {
    const { sum } = req.body as SetInitialSumDto;
    this.loggerService.requestInfo(req, sum, MODULE_NAME);

    const response = { sum };
    res.json(response);
    this.loggerService.responseInfo(req, response, MODULE_NAME);
  };

  getRoutes (): Route[] {
    return [
      { method: 'get', path: RoutePath.INFO, cb: this.getInfo },
      { method: 'post', path: RoutePath.SET_INITIAL_SUM, cb: this.setInitialAccountSum, middleware: [new ValidateMiddleware(SetInitialSumDto), this.authGuard] }
    ];
  }
}
