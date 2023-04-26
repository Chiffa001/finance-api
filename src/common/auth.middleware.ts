import { Request, Response, NextFunction } from 'express';

import { Middleware } from '~/types/middleware';
import { checkToken } from '~/utils/token';

export class AuthMiddleware implements Middleware {
  constructor (private readonly secret: string) {}

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const [, t] = token.split(' ');

        if (!t) {
          next();

          return;
        }

        req.user = await checkToken(t, this.secret) as Request['user'];
      } catch (e) {
        // nothing
      }

      next();
      return;
    }

    next();
  };
}
