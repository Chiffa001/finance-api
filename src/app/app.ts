import { Server } from 'http';

import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { AccountController } from '~/account';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { RouteBasePath } from '~/types/route';
import 'reflect-metadata';

@injectable()
export class App {
  private static readonly port = process.env.PORT ?? 3000;
  private readonly app: Express;
  private server: Server;

  constructor (
    @inject(Modules.Logger) private readonly logger: Logger,
    @inject(Modules.AccountController) private readonly accountController: AccountController
  ) {
    this.app = express();
  }

  useRoutes () {
    this.app.use(RouteBasePath.ACCOUNT, this.accountController.router);
  }

  public async init () {
    this.useRoutes();

    this.server = this.app.listen(App.port, () => {
      this.logger.info(`server is running on port ${App.port}`);
    });
  }
}
