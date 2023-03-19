import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { Guard } from '~/common/guard';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { Middleware } from '~/types/middleware';
import 'reflect-metadata';

@injectable()
export class RoleGuard extends Guard implements Middleware {
  moduleName = 'RoleGuard';
  constructor (@inject(Modules.Logger) private readonly loggerService: Logger) {
    super(loggerService);
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    this.loggerService.requestInfo(req, req.user, this.moduleName);

    if (!req.user) {
      this.forbidden(req, res);
      return;
    }

    const { role } = req.user;

    if (!(role === 'ADMIN')) {
      this.forbidden(req, res);
      return;
    }

    next();
    this.loggerService.responseInfo(req, { message: 'available' }, this.moduleName);
  };
}
