import { Router } from 'express';
import { injectable } from 'inversify';

import { Logger } from '~/types/logger';
import { Route } from '~/types/route';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  private readonly logger: Logger;

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
      this.logger.info(`${path} [${method}]: registered`);
      const pipeline = Array.isArray(middleware)
        ? [...middleware.map(m => m.execute), cb]
        : cb;
      this._router[method](path, pipeline);
    });
  }
}
