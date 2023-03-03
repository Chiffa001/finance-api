import { inject, injectable } from 'inversify';

import { AddOperationDto } from './dto/add-operation.dto';
import { OperationsService } from './operations.service';

import { AuthGuard } from '~/auth';
import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';

enum RoutePath {
  ADD = '/add'
}

@injectable()
export class OperationsController extends BaseController {
  readonly moduleName = 'OperationsController';
  constructor (@inject(Modules.Logger) private readonly loggersService: Logger, @inject(Modules.OperationsService) private readonly operationService: OperationsService, @inject(Modules.AuthGuard) private readonly authGuard: AuthGuard) {
    super(loggersService);
  }

  add: ControllerHandler = async (req, res) => {
    const { user, body } = req;
    this.loggersService.requestInfo(req, { user, body }, this.moduleName);
    const operation = await this.operationService.add(body as AddOperationDto);
    const response = { user, operation };
    this.loggersService.responseInfo(req, response, this.moduleName);
    res.status(201).json(response);
  };

  getRoutes (): Route[] {
    return [
      { method: 'post', path: RoutePath.ADD, cb: this.add, middleware: [new ValidateMiddleware(AddOperationDto), this.authGuard] }
    ];
  }
}
