import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { Logger } from '~/types/logger';

@injectable()
export abstract class Guard {
  abstract readonly moduleName: string;
  constructor (readonly logger: Logger) {}

  forbidden = (req: Request, res: Response) => {
    const response = { error: 'forbidden' };
    res.status(403).json(response);
    this.logger.responseInfo(req, response, this.moduleName);
  };
}
