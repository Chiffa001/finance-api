import { Server } from 'http';
import express, { Express } from 'express';
import { Logger } from '~/types/logger';
import { RouteBasePath } from '~/types/route';
import { AccountController } from '~/account';

export class App {
  private static readonly port = process.env.PORT ?? 3000;
  private readonly app: Express;
  private server: Server;
  private readonly logger: Logger;

  constructor (logger: Logger) {
    this.app = express();
    this.logger = logger;
  }

  useRoutes () {
    this.app.use(RouteBasePath.ACCOUNT, (new AccountController(this.logger)).router);
  }

  public async init () {
    this.useRoutes();

    this.server = this.app.listen(App.port, () => {
      this.logger.info(`server is running on port ${App.port}`);
    });
  }
}
