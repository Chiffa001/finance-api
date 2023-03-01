import { inject, injectable } from 'inversify';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

import { AuthGuard } from '~/auth';
import { BaseController } from '~/common/base-controller';
import { ValidateMiddleware } from '~/common/validate.middleware';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { ControllerHandler, Route } from '~/types/route';

enum RoutePath {
  CREATE = '/create',
  GET_ALL = '/getAll'
}

const MODULE_NAME = 'CategoriesController';

@injectable()
export class CategoriesController extends BaseController {
  constructor (@inject(Modules.CategoriesService) private readonly categoriesService: CategoriesService, @inject(Modules.Logger) private readonly loggerService: Logger, @inject(Modules.AuthGuard) private readonly authGuard: AuthGuard) {
    super(loggerService);
  }

  create: ControllerHandler = async (req, res) => {
    const { body, user } = req;
    this.loggerService.requestInfo(req, { body, user }, MODULE_NAME);
    const category = await this.categoriesService.create(user.id, body as CreateCategoryDto);
    const response = { user, category };
    res.status(201).json(response);
    this.loggerService.responseInfo(req, response, MODULE_NAME);
  };

  getAll: ControllerHandler = async (req, res) => {
    const { user } = req;
    this.loggerService.requestInfo(req, user, MODULE_NAME);
    const categories = await this.categoriesService.getAll(user.id);
    const response = { user, categories };
    res.json(response);
    this.loggerService.responseInfo(req, response, MODULE_NAME);
  };

  getRoutes (): Route[] {
    return [
      { method: 'post', path: RoutePath.CREATE, cb: this.create, middleware: [new ValidateMiddleware(CreateCategoryDto), this.authGuard] },
      { method: 'get', path: RoutePath.GET_ALL, cb: this.getAll, middleware: [this.authGuard] }
    ];
  }
}
