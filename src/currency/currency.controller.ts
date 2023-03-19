import { inject, injectable } from 'inversify';

import { ControllerHandler } from './../types/route';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

import { AuthGuard, RoleGuard } from '~/auth';
import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { LoggerService } from '~/logger';
import { Modules } from '~/modules';
import { Route } from '~/types/route';

@injectable()
export class CurrencyController extends BaseController {
  readonly moduleName = 'CurrencyController';
  constructor (@inject(Modules.Logger) private readonly loggerService: LoggerService, @inject(Modules.CurrencyService) private readonly currencyService: CurrencyService, @inject(Modules.AuthGuard) private readonly authGuard: AuthGuard, @inject(Modules.RoleGuard) private readonly roleGuard: RoleGuard) {
    super(loggerService);
  }

  getAll: ControllerHandler = async (req, res) => {
    const { user } = req;
    this.loggerService.requestInfo(req, { user }, this.moduleName);
    const currencyList = await this.currencyService.getAll();
    const response = {
      user, currencyList
    };
    res.json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  create: ControllerHandler = async (req, res) => {
    const { user, body } = req;
    this.loggerService.requestInfo(req, { user, body }, this.moduleName);
    const currency = await this.currencyService.create(body as CreateCurrencyDto);
    const response = { user, currency };
    res.status(201).json(response);
    this.loggerService.responseInfo(req, response, this.moduleName);
  };

  getRoutes (): Route[] {
    return [
      { path: '/getAll', method: 'get', cb: this.getAll, middleware: [this.authGuard] },
      { path: '/add', method: 'post', cb: this.create, middleware: [new ValidateMiddleware(CreateCurrencyDto), this.authGuard, this.roleGuard] }
    ];
  }
}
