import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import { Middleware } from '~/types/middleware';
import { isArrayWithItems } from '~/utils/array';

export class ValidateMiddleware implements Middleware {
  constructor (private readonly classToValidate: ClassConstructor<object>) {}

  execute = async ({ body }: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(this.classToValidate, body);
    const errors = await validate(instance);

    if (isArrayWithItems(errors)) {
      res.status(400).send(errors);
      return;
    }

    next();
  };
}
