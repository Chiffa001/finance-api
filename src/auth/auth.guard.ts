import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { PrismaService } from '~/database';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';
import { Middleware } from '~/types/middleware';

import 'reflect-metadata';

const MODULE_NAME = 'AuthGuard';

@injectable()
export class AuthGuard implements Middleware {
  constructor (@inject(Modules.PrismaService) private readonly prismaService: PrismaService, @inject(Modules.Logger) private readonly loggerService: Logger) {}

  forbidden = (req: Request, res: Response) => {
    const response = { error: 'forbidden' };
    res.status(403).json(response);
    this.loggerService.responseInfo(req, response, MODULE_NAME);
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    this.loggerService.requestInfo(req, req.user, MODULE_NAME);

    if (!req.user) {
      this.forbidden(req, res);
      return;
    }

    const { email } = req.user;

    const isUserExist = await this.prismaService.client.userModel.findFirst({ where: { email } });

    if (!isUserExist) {
      this.forbidden(req, res);
      return;
    }

    next();
    this.loggerService.responseInfo(req, { message: 'available' }, MODULE_NAME);
  };
}
