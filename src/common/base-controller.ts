import { Router } from 'express';
import { Logger } from '~/types/logger';
import { Route } from '~/types/route';

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
    this.getRoutes().forEach(({ method, path, cb }) => {
      this.logger.info(`${path} [${method}]: registered`);
      this._router[method](path, cb);
    });
  }
}
