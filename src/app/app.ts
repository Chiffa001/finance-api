import { Server } from 'http';

import { json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { AccountController } from '~/account';
import { ClientError } from '~/client-error';
import { AuthMiddleware } from '~/common/auth.middleware';
import { ConfigService } from '~/config';
import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { RouteBasePath } from '~/types/route';
import { UsersController } from '~/users';
import 'reflect-metadata';

@injectable()
export class App {
  private static readonly port = process.env.PORT ?? 3000;
  private readonly app: Express;
  private server: Server;

  constructor (
    @inject(Modules.Logger) private readonly logger: Logger,
    @inject(Modules.AccountController) private readonly accountController: AccountController,
    @inject(Modules.ClientError) private readonly clientError: ClientError,
    @inject(Modules.PrismaService) private readonly prismaService: PrismaService,
    @inject(Modules.UsersController) private readonly usersController: UsersController,
    @inject(Modules.ConfigService) private readonly configService: ConfigService
  ) {
    this.app = express();
  }

  useErrorHandler () {
    this.app.use(this.clientError.handler);
  }

  useRoutes () {
    this.app.use(RouteBasePath.ACCOUNT, this.accountController.router);
    this.app.use(RouteBasePath.USERS, this.usersController.router);
  }

  useMiddleware () {
    this.app.use(json());
    this.app.use((new AuthMiddleware(this.configService.get('SECRET'))).execute);
  }

  public async init () {
    this.useMiddleware();
    this.useRoutes();
    this.useErrorHandler();

    await this.prismaService.connect();

    this.server = this.app.listen(App.port, () => {
      this.logger.info(`server is running on port ${App.port}`);
    });
  }
}
