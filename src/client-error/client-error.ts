import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { Modules } from '~/modules';
import { Logger } from '~/types/logger';

@injectable()
export class ClientError {
  constructor (@inject(Modules.Logger) private readonly logger: Logger) {}

  handler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    this.logger.errorResponseInfo(req, err.message, 'ClientError');
    res.status(500).json({ error: 'Unexpected error' });
  };
}
