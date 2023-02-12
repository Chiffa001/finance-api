import { BaseController } from '~/common/base-controller';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';
import { AccountService } from './account.service';

enum RoutePath {
  INFO = '/accountInfo',
}

export class AccountController extends BaseController {
  private readonly service: AccountService;
  constructor (logger: Logger) {
    super(logger);
    this.service = new AccountService();
  }

  getInfo: ControllerHandler = (req, res) => {
    const info = this.service.getInfo();
    res.json({ info });
  };

  getRoutes (): Route[] {
    return [
      { method: 'get', path: RoutePath.INFO, cb: this.getInfo }
    ];
  }
}
