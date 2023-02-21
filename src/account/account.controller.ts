import { inject, injectable } from 'inversify';

import { AccountService } from './account.service';
import { SetInitialSumDto } from './dto/set-initial-sum.dto';

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

@injectable()
export class AccountController extends BaseController {
  constructor (
    @inject(Modules.Logger) private readonly loggerService: Logger,
    @inject(Modules.AccountService) private readonly accountService: AccountService) {
    super(loggerService);
  }

  getInfo: ControllerHandler = (req, res) => {
    const info = this.accountService.getInfo();
    this.loggerService.requestInfo(req, req.params);
    const response = { info };
    res.json(response);
    this.loggerService.responseInfo(req, response);
  };

  setInitialAccountSum: ControllerHandler = (req, res) => {
    const { sum } = req.body as SetInitialSumDto;
    this.loggerService.requestInfo(req, sum);

    const response = { sum };
    res.json(response);
    this.loggerService.responseInfo(req, response);
  };

  getRoutes (): Route[] {
    return [
      { method: 'get', path: RoutePath.INFO, cb: this.getInfo },
      { method: 'post', path: RoutePath.SET_INITIAL_SUM, cb: this.setInitialAccountSum, middleware: [new ValidateMiddleware(SetInitialSumDto)] }
    ];
  }
}
