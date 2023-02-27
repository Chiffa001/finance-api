import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { Middleware } from '~/types/middleware';

export class AuthMiddleware implements Middleware {
  constructor (private readonly secret: string) {}

  private readonly checkToken = async (token: string) => {
    return await new Promise((resolve, reject) => {
      verify(token, this.secret, (err, decoded) => {
        if (err) {
          reject(err);
        }

        resolve(decoded);
      });
    });
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const [, t] = token.split(' ');

        if (!t) {
          next();

          return;
        }

        req.user = await this.checkToken(t) as Request['user'];
      } catch (e) {
        // nothing
      }

      next();
      return;
    }

    next();
  };
}
