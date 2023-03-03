import { Request } from 'express';
import { injectable } from 'inversify';
import winston, { Logger as WinstonLogger, format as winstonFormat } from 'winston';

import { Logger } from '~/types/logger';

import 'reflect-metadata';

@injectable()
export class LoggerService implements Logger {
  private readonly logger: WinstonLogger;

  constructor () {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winstonFormat.combine(
            winstonFormat.colorize(),
            winstonFormat.simple()
          )
        })
      ]
    });
  }

  info = (message: string) => {
    this.logger.info(message);
  };

  warn = (message: string) => {
    this.logger.warn(message);
  };

  error = (message: string) => {
    this.logger.error(message);
  };

  getRequestInfo = (request: Request) => `${request.baseUrl}${request.url} [${request.method}] headers: ${JSON.stringify(request.headers)}`;

  requestInfo = (request: Request, requestData: unknown, moduleName: string) => {
    const requestInfo = this.getRequestInfo(request);
    this.logger.info(`REQUEST [${moduleName}] ${requestInfo}: ${JSON.stringify({ request: requestData })}`);
  };

  responseInfo = (request: Request, responseData: unknown, moduleName: string) => {
    const requestInfo = this.getRequestInfo(request);
    this.logger.info(`RESPONSE [${moduleName}] ${requestInfo}: ${JSON.stringify({ response: responseData })}`);
  };

  errorResponseInfo = (request: Request, responseData: unknown, moduleName: string) => {
    const requestInfo = this.getRequestInfo(request);
    this.logger.error(`RESPONSE [${moduleName}] ${requestInfo}: ${JSON.stringify({ response: responseData })}`);
  };
}
