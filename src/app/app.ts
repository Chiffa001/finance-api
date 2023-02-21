import { Server } from 'http';

import { json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { AccountController } from '~/account';
import { ClientError } from '~/client-error';
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
    @inject(Modules.AccountController) private readonly accountController: AccountController,
    @inject(Modules.ClientError) private readonly clientError: ClientError
  ) {
    this.app = express();
  }

  useErrorHandler () {
    this.app.use(this.clientError.handler);
  }

  useRoutes () {
    this.app.use(RouteBasePath.ACCOUNT, this.accountController.router);
  }

  useMiddleware () {
    this.app.use(json());
  }

  public async init () {
    this.useMiddleware();
    this.useRoutes();
    this.useErrorHandler();

    this.server = this.app.listen(App.port, () => {
      this.logger.info(`server is running on port ${App.port}`);
    });
  }
}
