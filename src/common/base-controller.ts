import { Router } from 'express';
import { injectable } from 'inversify';

import { Logger } from '~/types/logger';
import { Route } from '~/types/route';
import 'reflect-metadata';
import { controllerMethodCreator } from '~/utils/controller-method-creator';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  private readonly logger: Logger;
  abstract readonly moduleName: string;

  constructor (logger: Logger) {
    this._router = Router();
    this.logger = logger;
  }

  get router () {
    this.bindRoutes();
    return this._router;
  }

  abstract getRoutes (): Route[];

  bindRoutes () {
    this.getRoutes().forEach(({ method, path, cb, middleware }) => {
      this.logger.info(`[${this.moduleName ?? ''}] ${path} [${method}]: registered`);
      const createdCb = controllerMethodCreator(cb);
      const pipeline = Array.isArray(middleware)
        ? [...middleware.map(m => m.execute), createdCb]
        : createdCb;
      this._router[method](path, pipeline);
    });
  }
}
