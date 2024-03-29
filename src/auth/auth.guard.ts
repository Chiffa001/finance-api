import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { Guard } from '~/common/guard';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { Middleware } from '~/types/middleware';
import { UsersService } from '~/users';
import 'reflect-metadata';

@injectable()
export class AuthGuard extends Guard implements Middleware {
  moduleName = 'AuthGuard';
  constructor (@inject(Modules.UsersService) private readonly usersService: UsersService, @inject(Modules.Logger) private readonly loggerService: Logger) {
    super(loggerService);
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    this.loggerService.requestInfo(req, req.user, this.moduleName);

    if (!req.user) {
      this.forbidden(req, res);
      return;
    }

    const { email } = req.user;

    const isUserExist = await this.usersService.isUserExist(email);

    if (!isUserExist) {
      this.forbidden(req, res);
      return;
    }

    next();
    this.loggerService.responseInfo(req, { message: 'available' }, this.moduleName);
  };
}
